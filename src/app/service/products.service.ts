import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private fs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getAllProducts() {
    return this.fs.collection('Products').valueChanges();
  }

  addNewProducts(Name: string, Price: number, image: File) {
    let ref = this.storage.ref('ProductsImages/' + image.name);
    ref.put(image).then((data) => {
      // console.log(data);
      ref.getDownloadURL().subscribe((ProductPath) => {
        this.fs.collection('Products').add({
          Name,
          Price,
          ProductPath,
        });
      });
    });
  }

  getProducts() {
    return this.fs.collection('Products').snapshotChanges();
  }

  deleteProducts(id) {
    return this.fs.doc(`Products/${id}`).delete();
  }

  updateProducts(id, Price) {
    return this.fs.doc(`Products/${id}`).update({ Price });
  }
}
