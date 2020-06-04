import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { CartService } from './../../service/cart.service';
import { Product } from './../../Interface/products.interface';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  add: number = -1;
  Products: Array<any> = [];
  //   {
  //     Name: 'Banana',
  //     Price: 3,
  //     Desc: 'Fruit',
  //     ProductPath: '../assets/Pics/Banana.png',
  //   },
  //   {
  //     Name: 'Kiwi',
  //     Price: 3,
  //     Desc: 'Fruit',
  //     ProductPath: '../assets/Pics/Kiwi.jpg',
  //   },
  //   {
  //     Name: 'Orange',
  //     Price: 3,
  //     Desc: 'Fruit',
  //     ProductPath: '../assets/Pics/Orange.jpg',
  //   },
  //   {
  //     Name: 'Strawberry',
  //     Price: 3,
  //     Desc: 'Fruit',
  //     ProductPath: '../assets/Pics/strawberry.jpg',
  //   },
  // ];
  constructor(
    private ps: ProductsService,
    private cart: CartService,
    private as: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ps.getAllProducts().subscribe((data) => {
      this.Products = data;
    });
  }

  addToCart(index) {
    if (this.as.userId) {
      this.add = +index;
    } else {
      this.router.navigate(['/login']);
    }
    // console.log('added', this.Products[index]);
  }

  buy(amount) {
    let selectedProduct = this.Products[this.add];
    // console.log(selectedProduct);
    let data = {
      name: selectedProduct.Name,
      price: selectedProduct.Price,
      amount: +amount,
    };
    // console.log(data);
    this.cart
      .addToCart(data)
      .then(() => {
        this.add = -1;
      })
      .catch((err) => console.log(err));
  }
}
