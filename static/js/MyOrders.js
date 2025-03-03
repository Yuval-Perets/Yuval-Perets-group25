document.addEventListener('DOMContentLoaded', () => {
    // Attach logout event
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = '/logout';
        });
    }


    // Modal elements
    const updateModal = document.getElementById('updateModal');
    const closeModal = updateModal.querySelector('.close');
    const updateOrderForm = document.getElementById('updateOrderForm');
    const updateOrderIdInput = document.getElementById('update-order-id');
    const updateDateInput = document.getElementById('update-date');
    const updateTimeInput = document.getElementById('update-time');
    const updateGuestsInput = document.getElementById('update-guests');
    const updateSpecialInput = document.getElementById('update-special');
    
    // Function to open modal and pre-fill with order data
    function openUpdateModal(order) {
        updateOrderIdInput.value = order._id;
        updateDateInput.value = order.date;
        updateTimeInput.value = order.time;
        updateGuestsInput.value = order.guests;
        updateSpecialInput.value = order.special_requests || '';
        updateModal.style.display = 'block';
    }
    
    // Close modal when user clicks the "x"
    closeModal.addEventListener('click', () => {
        updateModal.style.display = 'none';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === updateModal) {
            updateModal.style.display = 'none';
        }
    });
    
    // Handle update form submission
    updateOrderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const orderId = updateOrderIdInput.value;
        const updateData = {
            date: updateDateInput.value,
            time: updateTimeInput.value,
            guests: updateGuestsInput.value,
            special_requests: updateSpecialInput.value
        };
        fetch(`/api/order/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message || result.error);
            updateModal.style.display = 'none';
            loadOrders(); // Refresh orders after update
        })
        .catch(error => {
            console.error('Error updating order:', error);
        });
    });
    
    // Function to render orders
    function renderOrders(orders) {
        const ordersList = document.getElementById('orders-list');
        if (ordersList) {
            ordersList.innerHTML = '';
            if (orders.length === 0) {
                ordersList.innerHTML = '<p>אין הזמנות להציג</p>';
            } else {
                orders.forEach(order => {
                    // Create a card for each order
                    const orderCard = document.createElement('div');
                    orderCard.classList.add('order-card');
                    
                    const restaurantName = document.createElement('h3');
                    restaurantName.textContent = order.restaurant;
                    orderCard.appendChild(restaurantName);
                    
                    const orderDetails = document.createElement('p');
                    orderDetails.textContent = `תאריך: ${order.date} שעה: ${order.time} | סועדים: ${order.guests}`;
                    orderCard.appendChild(orderDetails);
                    
                    if (order.special_requests) {
                        const specialReq = document.createElement('p');
                        specialReq.textContent = `בקשות מיוחדות: ${order.special_requests}`;
                        orderCard.appendChild(specialReq);
                    }
                    
                    // Create Update and Delete buttons container
                    const actionsDiv = document.createElement('div');
                    actionsDiv.classList.add('order-actions');
                    
                    // Update button
                    const updateBtn = document.createElement('button');
                    updateBtn.classList.add('btn', 'outline');
                    updateBtn.textContent = 'עדכן';
                    updateBtn.addEventListener('click', () => {
                        openUpdateModal(order);
                    });
                    actionsDiv.appendChild(updateBtn);
                    
                    // Delete button
                    const deleteBtn = document.createElement('button');
                    deleteBtn.classList.add('btn', 'outline');
                    deleteBtn.textContent = 'מחק';
                    deleteBtn.addEventListener('click', () => {
                        if (confirm('האם אתה בטוח שברצונך למחוק את ההזמנה?')) {
                            fetch(`/api/order/${order._id}`, {
                                method: 'DELETE'
                            })
                            .then(response => response.json())
                            .then(result => {
                                alert(result.message || result.error);
                                loadOrders(); // Refresh orders after deletion
                            })
                            .catch(error => {
                                console.error('Error deleting order:', error);
                            });
                        }
                    });
                    actionsDiv.appendChild(deleteBtn);
                    
                    orderCard.appendChild(actionsDiv);
                    ordersList.appendChild(orderCard);
                });
            }
        }
    }
    
    // Function to load orders from the API
    function loadOrders() {
        fetch('/api/myorders')
          .then(response => response.json())
          .then(orders => {
              renderOrders(orders);
          })
          .catch(error => {
              console.error('Error fetching orders:', error);
          });
    }
    
    // Initial load of orders
    loadOrders();
});
