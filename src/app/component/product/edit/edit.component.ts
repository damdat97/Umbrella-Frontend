import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Category} from "../../../model/category";
import {CategoryService} from "../../../service/category.service";
import {Product} from "../../../model/product";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    categoryId: new FormControl(''),
    user:new FormControl('')
  })
  obj: any;
  listCategory: Category[] = []
  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private categoriesService: CategoryService,
              private router: Router,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe((data)=> {
      console.log(data)
      this.listCategory = data
    })

    this.activatedRoute.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.findById(id);
    })
  }


  findById(id: any) {
    this.productService.findById(id).subscribe((data) => {
      console.log(data);
      this.editForm = new FormGroup({
        id: new FormControl(data.id),
        name: new FormControl(data.name),
        price: new FormControl(data.price),
        quantity: new FormControl(data.quantity),
        description: new FormControl(data.description),
        categoryId: new FormControl(data.category),
        user:new FormControl(data.user)
      })
    })
  }

  save() {
    this.obj = {
      name: this.editForm.value.name,
      category: {
        id: this.editForm.value.categoryId
      },
      quantity: this.editForm.value.quantity,
      price: this.editForm.value.price,
      description: this.editForm.value.description,
      user: {
        id: localStorage.getItem("ID")
      }
    }
    console.log(this.obj)
    this.productService.updateProduct(this.editForm.value.id, this.obj).subscribe(() => {
      this.toast.success({detail: "Thành Công", summary: 'Sửa thành công!', duration: 3000})
      // @ts-ignore
      $('#exampleModalEdit').modal('hide');
      this.editForm.reset()
      this.router.navigate(["/product-detail", this.editForm.value.id])
    }, error => {
      this.toast.warning({detail: "Lỗi!", summary: 'Nhập sai, không thẻ sửa!', duration: 3000})
      console.log(error)
    })
  }
}
