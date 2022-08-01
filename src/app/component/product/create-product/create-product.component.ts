import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ImageService} from "../../../service/image.service";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {finalize} from "rxjs";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    image: new FormControl(),
  })

  constructor(private router: Router,
              private productService: ProductService,
              private storage: AngularFireStorage,
              private imageService: ImageService,
              private categoryService: CategoryService) {
  }

  selectedImages: any[] = [];
  product: any;
  listCategory: Category[] = []
  idProductImage: any;
  images: any[] = [];

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(value => {
      this.listCategory = value;
      console.log(value)
    })
  }

  add() {
    this.product = {
      name: this.productForm.value.name,
      category: {
        id: this.productForm.value.categoryId
      },
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      user: {
        id: localStorage.getItem('ID')
      },
      quantity: this.productForm.value.quantity
    }
    console.log(this.product)
    this.productService.save(this.product).subscribe((product) => {
      console.log(this.images)
      for (let i = 0; i < this.images.length; i++) {
        const image = {
          images: this.images[i],
          product: {
            id: product.id
          }
        };
        this.imageService.save(image).subscribe(() => {
          console.log('SUCCESSFULLY CREATE')


        });
      }
      this.productForm.reset()
      this.images = []
      console.log(this.images)
    }, error => {
      console.log(error)
    })
  }


  async showPreview(event: any) {
    let newSelectedImages = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      newSelectedImages = event.target.files;
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedImages.push(event.target.files[i]);
      }
    } else {
      this.selectedImages = [];
    }
    if (newSelectedImages.length !== 0) {
      for (let i = 0; i < newSelectedImages.length; i++) {
        let selectedImage = newSelectedImages[i];
        var n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        await this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.images.push(url);
            });
          })
        ).subscribe(() => {
        });
      }
    }

  }


}
