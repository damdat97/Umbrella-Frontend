import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {ImageService} from "../../../service/image.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Product} from "../../../model/product";
import {CommentService} from "../../../service/comment.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  obj: any = {
    image: [{
      id: 0,
      image: ''
    }],
    user: {
      id: 0
    }
  }

  commentForm: FormGroup = new FormGroup({
    description: new FormControl('')

  })
  id: any
  userId = localStorage.getItem("ID")
  listProduct: Product[] = []
  listComment: any;


  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private imageService: ImageService,
              private commentService: CommentService,
              private router: Router,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      console.log(param);
      this.productService.findById(this.id).subscribe((data) => {
        this.imageService.findAllByProductId(this.id).subscribe((image) => {
          this.obj = data
          this.obj.image = image;
          console.log(this.obj)
        })
      });
    });
    this.comment();
  }


  submit() {
    const obj = {
      product: {
        id: this.id
      },
      user: {
        id: localStorage.getItem('ID'),
      },
      description: this.commentForm.value.description
    }
    this.commentService.save(obj).subscribe(() => {
      this.commentForm.reset();
      this.comment()
      }, error => {
        alert("Loi");
        console.log(error)
      }
    )
  }

  comment() {
    this.commentService.findCommentByProductId(this.id).subscribe((data) => {
      console.log(this.id)
      console.log(data)
      this.listComment = data;
    }, error => {
    })
  }

  getProduct() {
    this.productService.findById(this.id).subscribe((data) => {
        this.imageService.findAllByProductId(data.id).subscribe((x)=> {
          console.log(x)
          this.obj = ({
            id: data.id,
            name:data.name,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            category: data.category,
            user: data.user,
            image: x
          })
        })
    }, error => {
      console.log(error);
    })
  }
  deleteProduct(id: any) {
    if (confirm('Bạn có muốn xóa sản phẩm này không ?')) {
      this.productService.delete(id).subscribe(() => {
        this.toast.success({detail: "Thành Công", summary: 'Xóa thành công!', duration: 3000})
        this.router.navigate(["/"])
        window.location.href = "/"
      }, e => {
        console.log(e);
      });
    }
  }

  image($event: any) {
    console.log("hihhihh")
  }
}
