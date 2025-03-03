document.addEventListener('DOMContentLoaded', () => {
    // Attach logout event if present
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = '/logout';
        });
    }

    // Extra validation for the order form
    const orderForm = document.querySelector('form');
    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            let errorMessages = [];
            const dateInput = orderForm.querySelector('input[name="date"]');
            const timeInput = orderForm.querySelector('input[name="time"]');
            const guestsInput = orderForm.querySelector('input[name="guests"]');
            const specialRequestsInput = orderForm.querySelector('textarea[name="special_requests"]');
  
            // Validate date is not in the past
            const today = new Date();
            today.setHours(0, 0, 0, 0); // reset time portion
            const selectedDate = new Date(dateInput.value);
            if (selectedDate < today) {
                errorMessages.push("התאריך חייב להיות היום או עתידי.");
            }
  
            // Validate time field is not empty
            if (!timeInput.value) {
                errorMessages.push("יש להזין שעה.");
            }
  
            // Validate guests is a number and at least 1
            const guests = parseInt(guestsInput.value, 10);
            if (isNaN(guests) || guests < 1) {
                errorMessages.push("מספר הסועדים חייב להיות לפחות 1.");
            }
  
            // Optionally: Validate the special requests length (if needed)
            if (specialRequestsInput.value && specialRequestsInput.value.length > 200) {
                errorMessages.push("בקשות מיוחדות לא יכולות להיות ארוכות מ-200 תווים.");
            }
  
            if (errorMessages.length > 0) {
                event.preventDefault(); // prevent form submission if there are errors
                alert(errorMessages.join("\n"));
            }
        });
    }
});
