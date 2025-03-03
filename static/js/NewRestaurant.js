document.addEventListener('DOMContentLoaded', () => {
    const restaurantForm = document.querySelector('.restaurant-form');
    
    function validateRestaurantForm(form) {
        const name = form.name.value.trim();
        const cuisine = form.cuisine.value.trim();
        const location = form.location.value.trim();
        const rating = form.rating.value.trim();
        const photoUrl = form.photo_url.value.trim();
        
        let errors = [];
        
        if (!name || !cuisine || !location || !rating || !photoUrl) {
            errors.push("יש למלא את כל השדות.");
        }
        // Validate rating is a number between 0 and 5
        const ratingNum = parseFloat(rating);
        if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
            errors.push("הדירוג חייב להיות מספר בין 0 ל-5.");
        }
        // Validate photo URL using the URL constructor
        try {
            new URL(photoUrl);
        } catch (e) {
            errors.push("כתובת התמונה אינה תקינה.");
        }
        
        return errors;
    }
    
    if (restaurantForm) {
        restaurantForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const errors = validateRestaurantForm(restaurantForm);
            if (errors.length > 0) {
                alert(errors.join("\n"));
                return;
            }
            
            const formData = {
                name: restaurantForm.name.value.trim(),
                cuisine: restaurantForm.cuisine.value.trim(),
                location: restaurantForm.location.value.trim(),
                rating: parseFloat(restaurantForm.rating.value),
                photo_url: restaurantForm.photo_url.value.trim()
            };
            
            fetch('/new_restaurant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(result => {
                alert(result.message || result.error);
                if (result.success) {
                    window.location.href = '/'; // Redirect upon success
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});
