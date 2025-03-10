# RestEasy

## Overview

RestEasy is a web-based platform designed to streamline restaurant table reservations. It allows users to book tables in advance, view restaurant information, manage their reservations, and receive real-time updates. The application is built using Flask and MongoDB, providing a robust backend with a responsive frontend.

## Features

### Restaurant Browsing
- View a list of available restaurants
- Filter by cuisine, location, and ratings
- View restaurant details including photos

### Table Reservation System
- Select a restaurant, date, time, and number of guests
- Add special requests for your reservation
- Receive confirmation of your booking

### User Account Management
- Register with full name, email, phone, and password
- Secure login with password hashing
- View and manage your profile information

### Reservation Management
- View all your current reservations
- Update reservation details (date, time, guests)
- Cancel reservations when needed

### Restaurant Registration
- Restaurant owners can register their establishments
- Add restaurant details including cuisine, location, and photos
- Manage restaurant information

### Data Validation
- Phone number validation (10 digits)
- Email format validation
- Password security requirements

### Responsive Design
- Optimized for both desktop and mobile devices
- Consistent user experience across platforms

## Technologies Used

### Backend
- **Flask**: Python web framework for the application
- **MongoDB**: NoSQL database for storing user, restaurant, and order data
- **PyMongo**: MongoDB driver for Python
- **Bcrypt**: Password hashing for secure authentication
- **Python-dotenv**: Environment variable management

### Frontend
- **HTML5**: Structure for web pages
- **CSS3**: Styling and responsive design
- **JavaScript**: Client-side interactivity and validation

## Project Structure

```
RestEasy/
├── app.py                 # Main Flask application
├── analyzeDB.py           # Database analysis utilities
├── settings.py            # Application settings
├── requirements.txt       # Project dependencies
├── static/                # Static assets
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript files
├── templates/             # HTML templates
│   ├── HomePage.html      # Landing page
│   ├── SignIn.html        # Authentication page
│   ├── NewOrder.html      # Reservation creation
│   ├── MyOrders.html      # User reservations
│   ├── Profile.html       # User profile
│   ├── NewRestaurant.html # Restaurant registration
│   └── OwnerSign.html     # Owner authentication
└── util/                  # Utility modules
    └── db/                # Database utilities
        └── db_connector.py # MongoDB connection
```

## Setup and Installation

### Prerequisites
- Python 3.6 or higher
- MongoDB (local or Atlas)
- Git

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/Yuval-Perets/Yuval-Perets-group25.git
   cd Yuval-Perets-group25
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DB_URI=your_mongodb_connection_string
   DB_NAME=resteasy_db
   SECRET_KEY=your_secret_key
   ```

4. Run the application:
   ```
   python app.py
   ```

5. Access the application at `http://localhost:5000`

## Usage Guide

1. **For Users**:
   - Register or log in via the SignIn page
   - Browse restaurants on the homepage
   - Select a restaurant to make a reservation
   - View and manage your reservations in the MyOrders page

2. **For Restaurant Owners**:
   - Register via the NewRestaurant page
   - Add restaurant details including cuisine, location, and photos
   - Manage restaurant information

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is available for educational and personal use.

## Contact

For questions or support, please contact the project maintainers.
