const cartManager = new CartManager();

        // Show notification
        function showNotification(message, type) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type} show`;
            setTimeout(() => {
                notification.className = 'notification';
            }, 3000);
        }

        // Create product card
        function createProductCard(product) {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">$${product.price}</p>
                    <p class="product-stock">Stock: ${product.stock}</p>
                    <button class="add-to-cart-btn" ${product.stock === 0 ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                </div>
            `;

            const addButton = card.querySelector('.add-to-cart-btn');
            addButton.addEventListener('click', () => {
                try {
                    cartManager.addToCart(product);
                    showNotification('Item added to cart', 'success');
                    renderCart();
                } catch (error) {
                    showNotification(error.message, 'error');
                }
            });

            return card;
        }

        // Render products
        function renderProducts() {
            const productsGrid = document.getElementById('products-grid');
            productsGrid.innerHTML = '';
            products.forEach(product => {
                productsGrid.appendChild(createProductCard(product));
            });
        }

        // Render cart
        function renderCart() {
            const shoppingCart = document.getElementById('shopping-cart');
            
            if (cartManager.cart.length === 0) {
                shoppingCart.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
                return;
            }

            let cartHTML = '';
            cartManager.cart.forEach(item => {
                cartHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 60px; height: 60px; object-fit: cover;">
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <p class="cart-item-price">$${item.price}</p>
                        </div>
                        <div class="cart-item-controls">
                            <button onclick="cartManager.updateQuantity(${item.id}, -1); renderCart()">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="cartManager.updateQuantity(${item.id}, 1); renderCart()">+</button>
                            <button onclick="cartManager.removeFromCart(${item.id}); renderCart()">×</button>
                        </div>
                    </div>
                `;
            });

            cartHTML += `
                <div class="cart-total">
                    <strong>Total: $${cartManager.calculateTotal().toFixed(2)}</strong>
                </div>
            `;

            shoppingCart.innerHTML = cartHTML;
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            renderCart();
        });