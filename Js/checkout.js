document.addEventListener('DOMContentLoaded', () => {
    const checkoutTotalElement = document.querySelector('#checkout-total');
    const button = document.querySelector('#pay');

    // Retrieve the total from localStorage and display it
    const cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        checkoutTotalElement.textContent = `Total: R${cartTotal}`;
        // Optionally clear the local storage if you no longer need it
        localStorage.removeItem('cartTotal');
    }

    // Function to process payment
    function processPayment(paymentMethod) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = 'Processing payment with ' + paymentMethod + '...';
        messageElement.classList.add('loading');

        // Simulate a delay for payment processing
        setTimeout(() => {
            // Simulate a successful payment
            const paymentSuccessful = true;

            if (paymentSuccessful) {
                messageElement.textContent = 'Payment successful using ' + paymentMethod + '!';
                messageElement.classList.remove('loading');
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = 'Payment failed. Please try again.';
                messageElement.classList.remove('loading');
                messageElement.style.color = 'red';
            }
        }, 2000); // Simulates a 2-second payment processing delay
    }

    // Function to show the form and visual representation for the selected payment method
    function showPaymentForm() {
        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const forms = document.querySelectorAll('.payment-method-form');
        forms.forEach(form => form.style.display = 'none'); // Hide all forms

        const selectedForm = document.getElementById(`${selectedPaymentMethod}-form`);
        if (selectedForm) {
            selectedForm.style.display = 'block'; // Show the selected form
        }

        // Hide all payment visuals initially
        const visuals = document.querySelectorAll('.payment-visual');
        visuals.forEach(visual => visual.style.display = 'none');

        // Show the visual representation of the selected payment method
        const selectedVisual = document.getElementById(`${selectedPaymentMethod}-visual`);
        if (selectedVisual) {
            selectedVisual.style.display = 'block'; // Show the selected visual
        }
    }

    // Handle form submission
    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        processPayment(selectedPaymentMethod);
    });

    // Add event listeners for radio button changes
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', showPaymentForm);
    });

    // Initialize the form view on page load
    showPaymentForm();
});
