class CartManager {
    constructor() {
        this.cart = [];
    }

    calculateTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    findCartItem(productId) {
        return this.cart.find(item => item.id === productId);
    }

    addToCart(product) {
        const existingItem = this.findCartItem(product.id);
        
        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                throw new Error('Not enough stock available');
            }
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
    }

    updateQuantity(productId, delta) {
        const item = this.findCartItem(productId);
        if (item) {
            const newQuantity = item.quantity + delta;
            const product = products.find(p => p.id === productId);
            
            if (newQuantity > 0 && newQuantity <= product.stock) {
                item.quantity = newQuantity;
            }
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
    }
}