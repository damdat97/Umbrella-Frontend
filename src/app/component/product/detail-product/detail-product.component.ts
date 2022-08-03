import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Product} from "../../../model/product";
import {CommentService} from "../../../service/comment.service";
import {ImageService} from "../../../service/image.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  obj: any;

  commentForm: FormGroup = new FormGroup({
    id: new FormControl(''),
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
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      console.log(param);
      this.productService.findById(this.id).subscribe((data) => {
        console.log(data);
        this.obj = data;
      });
    });
    this.comment();
    console.log(this.listComment)
  }


  submit() {
    this.obj = {
      product: {
        id: this.id
      },
      user: {
        id: localStorage.getItem('ID')
      },
      description: this.commentForm.value.description
    }
    console.log(this.obj)
    this.commentService.save(this.obj).subscribe((data) => {
        console.log(data)
      this.commentForm.reset();
      }, error => {
        alert("Loi");
        console.log(error)
      }
    )
  }

  comment() {
    this.commentService.getAllComment().subscribe((data) => {
      this.listComment = data;
      console.log(data)
    }, error => {

    })
    this.getProduct();
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

}
