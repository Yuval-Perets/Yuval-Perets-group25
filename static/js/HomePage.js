document.addEventListener('DOMContentLoaded', () => {
    // If the user is not logged in, attach event handler to the sign in/up button
    const signlogBtn = document.getElementById('signlog-btn');
    if (signlogBtn) {
        signlogBtn.addEventListener('click', () => {
            window.location.href = '/signin';
        });
    }
    
    // Attach event handler for the My Orders button if it exists
    const myordersBtn = document.getElementById('myorders-btn');
    if (myordersBtn) {
        myordersBtn.addEventListener('click', () => {
            window.location.href = '/myorders';
        });
    }
    
    // Attach logout event handler if the logout button exists
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = '/logout';
        });
    }
    
    // Global variable to store fetched restaurants
    let allRestaurants = [];

    // Function to render restaurant cards
    function renderRestaurants(restaurants) {
        const cardsContainer = document.querySelector('.popular-restaurants .cards');
        if (cardsContainer) {
            cardsContainer.innerHTML = '';
            if (restaurants.length === 0) {
                cardsContainer.innerHTML = '<p>לא נמצאו מסעדות</p>';
                return;
            }
            restaurants.forEach(restaurant => {
                const card = document.createElement('div');
                card.classList.add('card');
                
                // Image placeholder section
                const imagePlaceholder = document.createElement('div');
                imagePlaceholder.classList.add('image-placeholder');
                if (restaurant.photo_url) {
                    const img = document.createElement('img');
                    img.className = 'restaurant-image';
                    img.src = restaurant.photo_url;
                    img.alt = restaurant.name || 'Restaurant Photo';
                    // Optionally, add styling like width/height here
                    imagePlaceholder.appendChild(img);
                } else {
                    imagePlaceholder.textContent = '🍽️';
                }
                card.appendChild(imagePlaceholder);
                
                const contentDiv = document.createElement('div');
                contentDiv.classList.add('content');
                
                const nameEl = document.createElement('h3');
                nameEl.textContent = restaurant.name || 'מסעדה לא ידועה';
                contentDiv.appendChild(nameEl);
                
                const infoEl = document.createElement('p');
                infoEl.textContent = (restaurant.cuisine || 'מטבח') + ' • ' + (restaurant.location || 'תל אביב');
                contentDiv.appendChild(infoEl);
                
                const footerDiv = document.createElement('div');
                footerDiv.classList.add('card-footer');
                
                const ratingSpan = document.createElement('span');
                ratingSpan.textContent = '⭐ ' + (restaurant.rating || 'N/A');
                footerDiv.appendChild(ratingSpan);
                
                const orderBtn = document.createElement('button');
                orderBtn.classList.add('btn', 'outline');
                orderBtn.textContent = 'הזמן שולחן';
                orderBtn.addEventListener('click', () => {
                    window.location.href = '/order?restaurant=' + encodeURIComponent(restaurant.name);
                });
                footerDiv.appendChild(orderBtn);
                
                contentDiv.appendChild(footerDiv);
                card.appendChild(contentDiv);
                cardsContainer.appendChild(card);
            });
        }
    }

    // Function to filter restaurants based on search inputs
    function filterRestaurants() {
        const searchName = document.getElementById('search-name').value.trim().toLowerCase();
        const searchLocation = document.getElementById('search-location').value.trim().toLowerCase();
        const filtered = allRestaurants.filter(restaurant => {
            const nameMatch = restaurant.name ? restaurant.name.toLowerCase().includes(searchName) : true;
            const locationMatch = restaurant.location ? restaurant.location.toLowerCase().includes(searchLocation) : true;
            return nameMatch && locationMatch;
        });
        renderRestaurants(filtered);
    }

    // Fetch restaurants from the API on page load
    fetch('/api/restaurants')
      .then(response => response.json())
      .then(restaurants => {
          allRestaurants = restaurants;
          renderRestaurants(allRestaurants);
      })
      .catch(error => {
          console.error('Error fetching restaurants:', error);
      });
    
    // Search button event listener
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            filterRestaurants();
        });
    }
    
    // Optionally, filter on keyup events in search inputs
    const searchNameInput = document.getElementById('search-name');
    const searchLocationInput = document.getElementById('search-location');
    if (searchNameInput && searchLocationInput) {
        searchNameInput.addEventListener('keyup', filterRestaurants);
        searchLocationInput.addEventListener('keyup', filterRestaurants);
    }
});
