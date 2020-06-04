import { ProductsService } from 'src/app/service/products.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  ProductsArr: Array<any>;
  @ViewChild('image') image: ElementRef;
  constructor(private products: ProductsService) {}

  ngOnInit(): void {
    this.products.getProducts().subscribe((cs) => {
      this.ProductsArr = cs.map((x) => {
        return {
          id: x.payload.doc.id,
          ...(x.payload.doc.data() as {}),
        };
      });
      // console.log(this.ProductsArr);
    });
  }

  addNewProduct(f: NgForm) {
    let name = f.value.name,
      price = f.value.price,
      image = (this.image.nativeElement as HTMLInputElement).files[0];
    // console.log(f.value);
    // console.log((this.image.nativeElement as HTMLInputElement).files[0]);

    this.products.addNewProducts(name, price, image);
  }

  updateProductPrice(index) {
    this.products.updateProducts(
      this.ProductsArr[index].id,
      this.ProductsArr[index].Price
    );
  }

  deleteProduct(index) {
    this.products.deleteProducts(this.ProductsArr[index].id);
  }
}
