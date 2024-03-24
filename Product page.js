document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.addCart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.item');
            const cartItem = item.cloneNode(true);
            const quantityInput = cartItem.querySelector('.counter');
            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.classList.add('minus');
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

            const cartItemsContainer = document.querySelector('.RMiddle');
            cartItemsContainer.appendChild(cartItem);
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Function to calculate subtotal, discount amount, and grand total
    function calculateTotal() {
        let subtotal = 0;
        const cartItems = document.querySelectorAll('.cart-item');
        
        // Calculate subtotal by summing up the prices of all items in the cart
        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
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
document.addEventListener('DOMContentLoaded', function() {
    const placeOrderButton = document.querySelector('.placeOrder');
    const popup = document.getElementById('orderPopup');
    
    placeOrderButton.addEventListener('click', function() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const telInput = document.getElementById('tel');
        const addressInput = document.getElementById('address');
        const cardNumberInput = document.getElementById('card-number');
        const expiryMonthInput = document.getElementById('expiry-month');
        const expiryYearInput = document.getElementById('expiry-year');
        const cvvInput = document.getElementById('cvv');

        // Check if all required fields are filled
        if (!nameInput.value || !emailInput.value || !telInput.value || !addressInput.value || !cardNumberInput.value || !expiryMonthInput.value || !expiryYearInput.value || !cvvInput.value) {
            // If any required field is empty, display a prompt box
            alert('Please fill out all required fields.');
        } else {
            // All required fields are filled, proceed with displaying the popup
            const message = generatePopupMessage();
            const grandTotal = document.querySelector('.grand-total-amount').textContent;
            document.getElementById('popupMessage').textContent = message + `\n\nYour grand total is £${grandTotal}`;
            popup.classList.add('show');
        }
    });

    // Close the popup when the user clicks the okay button
    const okayButton = document.getElementById('okayButton');
    okayButton.addEventListener('click', function() {
        popup.classList.remove('show');
    });
});
function generatePopupMessage() {
    let message = "Dear Anna,\nYou have ordered:\n";

    // Iterate over each item in the cart
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        const itemName = item.querySelector('.name').textContent;
        const quantity = parseInt(item.querySelector('.counter').value);
        const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
        const itemCost = quantity * price;
        message += `${quantity} ${itemName} at a cost of £${itemCost.toFixed(2)}\n`;
    });

    // Calculate total bill
    let totalBill = 0;
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector('.counter').value);
        totalBill += price * quantity;
    });

    // Add total bill to the message
    message += `Your total bill is £${totalBill.toFixed(2)}.`;

    return message;
}
