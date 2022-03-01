export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }
  
  addProduct(product) {
    if(product){
      const cartItem = this.cartItems.find(x => x.product.id == product.id);
      if(cartItem == null){
        this.cartItems.push({product, count: 1});
      }else{
        cartItem.count++;
      }
  
      this.onProductUpdate(cartItem);
    }   
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(x => x.product.id == productId);
    if(cartItem){
      cartItem.count += amount;

      if(cartItem.count === 0){
        const cartItemItem = this.cartItems.indexOf(cartItem);
        this.cartItems.splice(cartItemItem, 1);
      }

      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return !this.cartItems.some(x => x.count > 0);
  }

  getTotalCount() {
   return this.cartItems.reduce((sum, cartItem) => {
      return sum + cartItem.count;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, cartItem) => {
      return sum + cartItem.count * cartItem.product.price;
    }, 0);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}

