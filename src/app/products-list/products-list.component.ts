import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { Product } from '../../modules/product';
import { DataService } from '../data.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
<<<<<<< HEAD
  constructor(private dataService: DataService, private cartService: CartService, private userService: UserService, private route: ActivatedRoute, private router: Router) {}
=======
  constructor( private dataService: DataService, private cartService: CartService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }
>>>>>>> master
  action: boolean; //what action to allow add or remove
  productsArray: Product[]; //products array
  //display the product
  clickOnProduct(product: Product) {
    if (this.action === true) {
      //check if we in get in from product list or from the card
      this.router.navigate(['product-details', product.productId]);
    } else {
      this.router.navigate(['cart/product-details', product.productId]);
    }
  }
  // click on edit button and sweech the flag and send the selected product
  editProduct(product: Product) {
    this.router.navigate(['edit-product', product.productId]);
  }
  //get selected list of products
  ngOnInit() {
    const selectedCategory: string = this.route.snapshot.paramMap.get('selectedCategory');
    if (selectedCategory === 'allProducts') {
      this.action = true;
      this.productsArray = this.dataService.loadAllProducts();
    } else if (selectedCategory === null) {
      //if it is shoping card list
      this.action = false;
      this.productsArray = this.cartService.loadcard();
    } else {
      this.action = true;
      this.productsArray = this.dataService.loadCategoryProdacts(selectedCategory);
    }
  }
}
