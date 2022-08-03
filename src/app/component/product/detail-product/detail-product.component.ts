import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Product} from "../../../model/product";
import {CommentService} from "../../../service/comment.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  commentForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('')

  })
  obj: any = [];
  id: any
  listProduct: Product[] = []
  listComment: any;


  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
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
      }, error => {
        alert("Loi");
        console.log(error)
      }
    )
  }

  comment() {
    this.commentService.getAllComment().subscribe((data) => {
      this.listComment = data;
    }, error => {

    })
  }

}
