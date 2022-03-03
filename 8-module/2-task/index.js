import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.init();
  }

  init(){
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `);

    for (const product of this.products) {
      const productCard = this.createProductCard(product);   
      this.elem.querySelector('.products-grid__inner').append(productCard.elem);
    }
  }

  createProductCard(product){
    const productCard = new ProductCard(product);      
      productCard.elem.dataset.nuts = product.nuts;
      productCard.elem.dataset.spiciness = product.spiciness;
      productCard.elem.dataset.category = product.category;
      productCard.elem.dataset.vegeterian = product.vegeterian;

      return productCard;
  }

  updateFilter(filters){
    Object.assign(this.filters, filters);

    const gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = "";
    
    this.products
      .map(x => this.createProductCard(x).elem)
      .filter(x => !this.filters.noNuts || !!x.dataset.nuts && !(x.dataset.nuts === 'true'))
      .filter(x => !this.filters.vegeterianOnly || !!x.dataset.vegeterian && x.dataset.vegeterian === 'true')
      .filter(x => !this.filters.category || !!x.dataset.category && this.filters.category === x.dataset.category)
      .filter(x => !!!this.filters.maxSpiciness || !!x.dataset.spiciness && this.filters.maxSpiciness >= x.dataset.spiciness)
      .forEach(x => gridInner.append(x));
  }
}