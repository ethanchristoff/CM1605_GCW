// Event listener to ensure DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.addCart');
    // Event listener for 'Add to Cart' buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Clone selected item to create a cart item
            const item = this.closest('.item');
            const cartItem = item.cloneNode(true);
            const quantityInput = cartItem.querySelector('.counter');
            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.classList.add('minus');
            // Event listener for minus button to adjust quantity or remove item from cart
            minusButton.addEventListener('click', function() {
                if (parseInt(quantityInput.value) >= 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                }
                if (parseInt(quantityInput.value) === 0) {
                    cartItem.remove(); // Remove the item from the cart if quantity is 0
                }
            });

            cartItem.classList.add('cart-item');

            // Remove product image from the cloned cart item
            cartItem.querySelector('.PImage').remove();

            // Replace the "Add to Cart" button with minus button and quantity input
            cartItem.querySelector('.butns').replaceWith(minusButton, quantityInput);
            // Append the cart item to the cart container
            const cartItemsContainer = document.querySelector('.RMiddle');
            cartItemsContainer.appendChild(cartItem);
        });
    });
});
// Function to calculate subtotal, discount amount, and grand total
document.addEventListener('DOMContentLoaded', function() {
    // Function to calculate subtotal, discount amount, and grand total
    function calculateTotal() {
        // Initialize subtotal
        let subtotal = 0;
        const cartItems = document.querySelectorAll('.cart-item');
        
        // Calculate subtotal by summing up the prices of all items in the cart
        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('￡', ''));
            const quantity = parseInt(item.querySelector('.counter').value);
            subtotal += price * quantity;
        });
        
        // Display subtotal
        const subtotalAmount = document.querySelector('.subtotal-amount');
        subtotalAmount.textContent = subtotal.toFixed(2);

        // Calculate discount amount (1 point = 1% discount)
        const points = parseInt(document.getElementById('points').value);
        const discountPercentage = points;
        const discountAmount = (subtotal * discountPercentage) / 100;

        // Display discount amount
        const discountAmountElement = document.querySelector('.discount-amount');
        discountAmountElement.textContent = discountAmount.toFixed(2);

        // Calculate grand total based on points
        let grandTotalAmount;
        if (points === 0) {
            grandTotalAmount = subtotal;
        } else {
            grandTotalAmount = subtotal - discountAmount;
        }

        // Display grand total
        const grandTotalAmountElement = document.querySelector('.grand-total-amount');
        grandTotalAmountElement.textContent = grandTotalAmount.toFixed(2);
    }

    // Call calculateTotal function when page loads
    calculateTotal();

    // Call calculateTotal function every second to update the grand total
    setInterval(calculateTotal, 100);

    // Call calculateTotal function when add to cart
    const addToCartButtons = document.querySelectorAll('.addCart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', calculateTotal);
    });

    // Call calculateTotal function when points input changes
    const pointsInput = document.getElementById('points');
    pointsInput.addEventListener('change', calculateTotal);
});
document.addEventListener('DOMContentLoaded', function() {
    // Function to clear the cart
    function clearCart() {
        // Select all cart items
        const cartItems = document.querySelectorAll('.cart-item');
        // Remove each cart item from the DOM
        cartItems.forEach(item => {
            item.remove();
        });
    }
    const clearOrderButton = document.querySelector('.clearOrder');
    clearOrderButton.addEventListener('click', function() {
        // Clear the cart
        clearCart();
        // Recalculate total after clearing the cart
        calculateTotal();
    });
});
// Event listener to handle placing an order
document.addEventListener('DOMContentLoaded', function() {
    // Event listener to handle placing an order
    const placeOrderButton = document.querySelector('.placeOrder');
    const popup = document.getElementById('orderPopup');
    const mainContent = document.querySelector('.main-container');
    
    placeOrderButton.addEventListener('click', function() {
        // Get user inputs
        const nameInput = document.getElementById('name').value;
        const emailInput = document.getElementById('email').value;
        const telInput = document.getElementById('tel').value;
        const addressInput = document.getElementById('address').value;
        const cardNumberInput = document.getElementById('card-number').value;
        const expiryMonthInput = document.getElementById('expiry-month').value;
        const expiryYearInput = document.getElementById('expiry-year').value;
        const cvvInput = document.getElementById('cvv').value;
        // Regular expressions for input validation
        const yearRegex = /^\d{4}$/; // Matches 4 digitts only
        const monthRegex = /^(0[1-9]|1[0-2])$/; // Matches two digits between 01 and 12
        const telRegex = /^\d{10}$/; // Matches 10 digits only
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Matches basic email format

        // Check if all required fields are filled and meet validation criteria
        if (!nameInput || !emailInput || !telInput || !addressInput || !cardNumberInput || !expiryMonthInput || !expiryYearInput || !cvvInput) {
            // If any required field is empty, display a prompt box
            alert('Please fill out all required fields.');
        } else if (!telRegex.test(telInput)) {
            // If telephone number format is incorrect, display an alert
            alert('Please enter a valid telephone number.');
        } else if (!emailRegex.test(emailInput)) {
            // If email format is incorrect, display an alert
            alert('Please enter a valid email address.');
        } else if (!yearRegex.test(expiryYearInput)) {
            // If year format is incorrect, display an alert
            alert('Please enter a valid year format.');
        } else if (!monthRegex.test(expiryMonthInput)) {
            // If month format is incorrect, display an alert
            alert('Please enter a valid month.');
        } else {
            // All required fields are filled, proceed with displaying the popup
            mainContent.classList.add('blur');
            const message = generatePopupMessage(nameInput, addressInput);
            document.getElementById('popupMessage').innerHTML = message;
            popup.classList.add('show');
        }
    });

    // Close the popup when the user clicks the okay button
    const okayButton = document.getElementById('okayButton');
    okayButton.addEventListener('click', function() {
        mainContent.classList.remove('blur');
        popup.classList.remove('show');
        location.reload();
    });
});
// Function to generate message for the order popup
function generatePopupMessage(name, address) {
    let message = `Dear ${name},<br><br>You have ordered:<br>`;

    // Iterate over each item in the cart
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const itemName = item.querySelector('.name').textContent;
        const quantity = parseInt(item.querySelector('.counter').value);
        const price = parseFloat(item.querySelector('.price').textContent.replace('￡', ''));
        const itemCost = quantity * price;
        message += `${quantity}x   ${itemName} at a cost of £${itemCost.toFixed(2)}<br>`;
    });

    // Calculate total bill
    let totalBill = 0;
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.price').textContent.replace('￡', ''));
        const quantity = parseInt(item.querySelector('.counter').value);
        totalBill += price * quantity;
    });

    // Add total bill to the message
    message += `<br>Your Subtotal bill is £${totalBill.toFixed(2)}.<br>`;

    const grandTotal = document.querySelector('.grand-total-amount').textContent;

    message += `Your Grand Total is £${grandTotal}<br>`;

    // Add address to the message
    message += `<br>Your order will be delivered to: ${address}`;

    return message;
}

var score = sessionStorage.getItem('score');

    if (score !== null) {
        // Do something with the score, e.g., display it
        console.log('Score:', score);

        // Update the max attribute of the points input field
        var pointsInput = document.getElementById('points');
        pointsInput.setAttribute('max', score);
    }
// Event listener for scrolling items left and right
document.addEventListener('DOMContentLoaded', function() {
    const leftButton = document.querySelector('.left-btn');
    const rightButton = document.querySelector('.right-btn');
    const middleContainer = document.querySelector('.middle');

    // Function to scroll items to the left
    leftButton.addEventListener('click', function() {
        middleContainer.scrollLeft -= 300; // Adjust the scroll distance as needed
    });

    // Function to scroll items to the right
    rightButton.addEventListener('click', function() {
        middleContainer.scrollLeft += 300; // Adjust the scroll distance as needed
    });
});

// Attach an event handler for the 'submit' event on the newsletter form.
document.getElementById('newsletterForm').onsubmit = function(event) {
    // Prevent the default form submission behavior.
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;

    // Define a regex pattern for basic email validation.
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the name and email fields are filled and if the email is valid.
    if(name && email && emailRegex.test(email)) {
        alert(`Dear ${name}, you have successfully subscribed for our personalized newsletter.`);
    } else {
        alert('Please ensure all fields are filled out correctly.');
    }
};

    