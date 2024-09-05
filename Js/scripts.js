document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#buy');
    const menuItems = document.querySelectorAll('.menu-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cart = document.querySelector('#cart');
    const cartIcon = document.querySelector('#cart-btn');
    const cartItems = document.querySelector('#cart-items');
    const clearCartButton = document.querySelector('#clear-cart');
    const checkoutButton = document.querySelector('#checkout');
    const totalElement = document.querySelector('#total-amount');
    const closeButton = document.querySelector('#close');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Update the total amount in cart
    const updateTotal = () => {
        let total = 0;
        document.querySelectorAll('#cart-items li').forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity').innerText, 10);
            const itemPrice = parseFloat(item.getAttribute('data-price').replace('R', ''));
            total += itemPrice * quantity;
        });
        totalElement.textContent = `Total: R${total.toFixed(2)}`;
    };
    
    // Update the cart item count
    const updateCartCount = () => {
        const cartCount = document.querySelectorAll('#cart-items li').length;
        document.getElementById('cart-count').textContent = cartCount;
    };

    // Add to cart function
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.closest('.menu-item');
            const itemName = item.querySelector('.text').innerText;
            const itemPrice = item.querySelector('.price').innerText;
            let listItem = Array.from(cartItems.children).find(child => child.getAttribute('data-name') === itemName);

            if (listItem) {
                // Increase quantity if already exists
                const quantityElem = listItem.querySelector('.quantity');
                quantityElem.innerText = parseInt(quantityElem.innerText, 10) + 1;
            } else {
                // Add new item
                listItem = document.createElement('li');
                listItem.setAttribute('data-name', itemName);
                listItem.setAttribute('data-price', itemPrice);
                listItem.innerHTML = `
                    <span>${itemName} - R${itemPrice} x <span class="quantity">1</span></span>
                    <button class="remove-btn">X</button>`;
                cartItems.appendChild(listItem);

                // Add function to remove button
                listItem.querySelector('.remove-btn').addEventListener('click', () => {
                    listItem.remove();
                    updateTotal();
                    updateCartCount();
                    if (cartItems.children.length === 0) {
                        cart.style.display = 'none';
                    }
                });
            }
            updateTotal();
            updateCartCount();
            cart.style.display = 'block';
        });
    });

        // Clear cart function
        clearCartButton.addEventListener('click', () => {
            cartItems.innerHTML = ''; // Remove all items
            updateTotal();
            updateCartCount();
            cart.style.display = 'none'; // Hide cart if it's empty
        });

    // Checkout function
    checkoutButton.addEventListener('click', () => {
        const total = parseFloat(totalElement.textContent.replace('Total: R', ''));
        localStorage.setItem('cartTotal', total.toFixed(2)); // Store total in localStorage
        window.location.href = 'checkout.html'; // Redirect to checkout page
    });

    // Close cart if empty
    closeButton.addEventListener('click', () => {
        cart.style.display = 'none';
    });

        // function to show cart
        const showCart = () => {
            cart.classList.remove('d-none');
        };

        //function to hide cart
        const hideCart = () => {
            cart.classList.add('d-none');
        };

        //show cart when icon clicked
        cartIcon.addEventListener('click', () => {
            showCart();
        });

    // Filter function
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            // Add 'active' class to the clicked button
            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            menuItems.forEach(item => {
                if (filter === "all" || item.classList.contains(filter)) {
                    item.style.display = "block"; // Show matched items
                } else {
                    item.style.display = "none"; // Hide unmatched items
                }
            });
        });
    });

        // Initialize Lottie animation
        var burgerAnimation = lottie.loadAnimation({
            container: document.getElementById('burgerAnimation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'lottie/burger.json.json'
        });

    // Smooth scrolling to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop - 80 && scrollPosition < section.offsetTop + section.offsetHeight - 80) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
