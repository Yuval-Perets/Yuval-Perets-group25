from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_cors import CORS
from dotenv import load_dotenv
from util.db.db_connector import get_db
import bcrypt
import os
from bson import ObjectId  # For handling MongoDB ObjectId

# Initialize Flask app and load environment variables
app = Flask(__name__)
load_dotenv()
app.secret_key = os.getenv('SECRET_KEY', 'default-secret-key')

db = get_db()
CORS(app)

MONGO_URI = os.getenv('MONGO_URI')
DB_NAME = os.getenv('MONGO_DB_NAME')

# Setup Mongo collections
users_collection = db['users']
orders_collection = db['orders']
restaurants_collection = db['restaurants']

# Home Page: Render the homepage template, passing the current user's full name
@app.route('/')
def home():
    return render_template('HomePage.html', user=session.get('user'))

# API Endpoint: Return recommended restaurants from the database
@app.route('/api/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = list(restaurants_collection.find({}, {'_id': 0}))
    return jsonify(restaurants)

# API Endpoint: Add a restaurant (for testing/insertion)
@app.route('/api/restaurant', methods=['POST'])
def add_restaurant():
    restaurant_data = request.get_json()
    if not restaurant_data:
        return jsonify({'error': 'No data provided'}), 400
    result = restaurants_collection.insert_one(restaurant_data)
    return jsonify({
        'message': 'Restaurant added successfully',
        'id': str(result.inserted_id)
    }), 201

@app.route('/new_restaurant', methods=['POST'])
def new_restaurant():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Required fields for a restaurant registration
    required_fields = ['name', 'cuisine', 'location', 'rating', 'photo_url']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    # Optionally, check if a restaurant with the same name already exists
    if restaurants_collection.find_one({"name": data['name']}):
        return jsonify({'error': 'Restaurant already registered'}), 400

    # Insert the new restaurant into the collection
    restaurants_collection.insert_one(data)
    return jsonify({'message': 'Restaurant registered successfully', 'success': True})


@app.route('/new_restaurant', methods=['GET'])
def new_restaurant_page():
    return render_template('NewRestaurant.html')


# Sign In / Sign Up Page: Render and process authentication
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'GET':
        return render_template('SignIn.html')
    else:
        # Registration logic if 'full_name' field exists in the form
        if 'full_name' in request.form:
            full_name = request.form.get('full_name')
            email = request.form.get('email')
            phone = request.form.get('phone')
            password = request.form.get('password')
            confirm_password = request.form.get('confirm_password')
            if password != confirm_password:
                error = "Passwords do not match."
                return render_template('SignIn.html', error=error)
            if users_collection.find_one({"email": email}):
                error = "Email already registered."
                return render_template('SignIn.html', error=error)
            hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            user_doc = {
                "full_name": full_name,
                "email": email,
                "phone": phone,
                "password": hashed_pw
            }
            users_collection.insert_one(user_doc)
            session['user'] = full_name
            return redirect(url_for('home'))
        else:
            # Login logic
            email = request.form.get('email')
            password = request.form.get('password')
            user = users_collection.find_one({"email": email})
            if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
                session['user'] = user.get('full_name', email)                
                return redirect(url_for('home'))
            else:
                error = "Invalid email or password."
                return render_template('SignIn.html', error=error)

# Logout route: Clear the session and redirect to home
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

# My Orders Page: Render the orders page for the current user
@app.route('/myorders')
def myorders():
    if not session.get('user'):
        return redirect(url_for('signin'))
    return render_template('MyOrders.html', user=session.get('user'))

# API Endpoint: Return orders for the current user, including order _id as a string
@app.route('/api/myorders', methods=['GET'])
def get_myorders():
    user = session.get('user')
    if not user:
        return jsonify({'error': 'Not authenticated'}), 401
    orders = list(orders_collection.find({"user": user}))
    for order in orders:
        order["_id"] = str(order["_id"])
    return jsonify(orders)

# API Endpoint: Update an order for the current user
@app.route('/api/order/<order_id>', methods=['PUT'])
def update_order(order_id):
    user = session.get('user')
    if not user:
        return jsonify({'error': 'Not authenticated'}), 401
    order_data = request.get_json()
    result = orders_collection.update_one(
        {"_id": ObjectId(order_id), "user": user},
        {"$set": order_data}
    )
    if result.modified_count > 0:
        return jsonify({'message': 'Order updated successfully'})
    else:
        return jsonify({'error': 'Order not found or no changes made'}), 404

# API Endpoint: Delete an order for the current user
@app.route('/api/order/<order_id>', methods=['DELETE'])
def delete_order(order_id):
    user = session.get('user')
    if not user:
        return jsonify({'error': 'Not authenticated'}), 401
    result = orders_collection.delete_one({"_id": ObjectId(order_id), "user": user})
    if result.deleted_count > 0:
        return jsonify({'message': 'Order deleted successfully'})
    else:
        return jsonify({'error': 'Order not found or not deleted'}), 404

# Order Page (GET): Display the order form for the selected restaurant
@app.route('/order', methods=['GET'])
def order_page():
    restaurant_name = request.args.get('restaurant')
    if not restaurant_name:
        return redirect(url_for('home'))
    restaurant = restaurants_collection.find_one({"name": restaurant_name}, {'_id': 0})
    if not restaurant:
        return redirect(url_for('home'))
    return render_template('NewOrder.html', restaurant=restaurant, user=session.get('user'))

# Order Creation (POST): Process the order form submission
@app.route('/order', methods=['POST'])
def create_order():
    restaurant_name = request.form.get('restaurant')
    date = request.form.get('date')
    time = request.form.get('time')
    guests = request.form.get('guests')
    special_requests = request.form.get('special_requests')
    user = session.get('user')
    if not user:
        return redirect(url_for('signin'))
    
    order = {
        "restaurant": restaurant_name,
        "user": user,
        "date": date,
        "time": time,
        "guests": guests,
        "special_requests": special_requests
    }
    orders_collection.insert_one(order)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
