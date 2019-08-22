import { Component, OnInit, Input,OnChanges,SimpleChanges } from "@angular/core";
import{ trigger , state , style , animate , transition } from "@angular/animations";
import {Product} from "../../modules/product";
import { DataService } from "../data.service";
import { CartService } from "../cart.service";
import { UserService } from '../user.service';

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"],
  animations:[trigger("fadeInOut", [
    state("void", style({opacity: 0})),
    transition("void => *", animate("1s")),
  ])]
})
export class ProductsListComponent implements OnInit,OnChanges {
  @Input() categorySelection: string; //get what kind data to load
  @Input() action:boolean; //what action to allow add or remove
  @Input() fromShopingCard:boolean=false; //show edit button if enter not from shoping card
  productsArray: Product[];//products array
  isActive: boolean = true; //flag for each page to show prodact or list
  editselect:boolean=false;//flag if it edit product
  productSelection: Product;//selected product
  //display the product
  clickOnProduct(product:Product) {
    this.productSelection = product;
    this.isActive = !this.isActive;
  }
  
  //after get input checks the input value and load data
  ngOnChanges(changes: SimpleChanges): void{
    if(changes.categorySelection.currentValue==="allProducts"){//if to show all products
      this.productsArray=this.dataService.loadAllProducts();
    }else if(changes.categorySelection.currentValue==="shoppingCard"){//if it is shoping card list
      this.productsArray=this.cartService.loadcard();
    }else{
      this.productsArray=this.dataService.loadCategoryProdacts(changes.categorySelection.currentValue);
    }
  }
  //go back to the product list
  back() {
    this.isActive = !this.isActive;
  }
  //change flags to go back to the list of products
  backFromEdit(){
    this.isActive =true;
    this.editselect=false;
  }
  // click on edit button and sweech the flag and send the selected product
  editProduct(product:Product){
    this.editselect=true;
    this.productSelection=product;
   }

  constructor(private dataService: DataService,private cartService:CartService, private userService:UserService) {}

  ngOnInit() {}
}
