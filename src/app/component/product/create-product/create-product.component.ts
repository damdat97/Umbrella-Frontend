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

  selectedImag: any;
  product: any;
  listCategory: Category[] = []
  idProductImage: any;
  image: any;
  images: any[] = []

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
      this.idProductImage = product.id
      for (let i = 0; i < this.images.length; i++) {
        this.image = {
          image: this.images[i],
          product: {
            id: this.idProductImage
          }
        };
        this.imageService.save(this.image).subscribe(() => {
          console.log('SUCCESSFULLY CREATE')
        });
      }
      this.productForm.reset()
      this.image = []
      this.router.navigate(["/"]);
      console.log(this.image)
    }, error => {
      console.log(error)
    })
  }

  selectedImages: any[] = [];

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
    } else {
      this.selectedImages = [];
    }
    if (this.selectedImages.length !== 0) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        let selectedImage = this.selectedImages[i];
        var n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
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
