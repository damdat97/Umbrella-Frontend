import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../../../service/comment.service";
import {ProductService} from "../../../service/product.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../model/product";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  commentForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    description: new FormControl('')

  })
  obj: any = [];
  id: any
  listProduct: Product[] = []



  constructor(private commentService: CommentService,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
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
        this.commentForm.reset()
        this.router.navigate(["detail-product"]);

      }, error => {
        alert("Loi");
        console.log(error)
      }
    )


  }

}
