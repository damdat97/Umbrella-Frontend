import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {ImageService} from "../../../service/image.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Product} from "../../../model/product";
import {CommentService} from "../../../service/comment.service";
import {NgToastService} from "ng-angular-popup";
import {CartItem} from "../../../model/CartItem";
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {User} from "../../../model/user";

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
              private toast: NgToastService,
              private shoppingCartService: ShoppingCartService) {
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
        this.toast.error({detail: "L???i", summary: "C???n ????ng nh???p ????? b??nh lu???n!", duration: 3000})
        this.router.navigate(['/login'])
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
      this.imageService.findAllByProductId(data.id).subscribe((x) => {
        console.log(x)
        this.obj = ({
          id: data.id,
          name: data.name,
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
    if (confirm('B???n c?? mu???n x??a s???n ph???m n??y kh??ng ?')) {
      this.productService.delete(id).subscribe(() => {
        this.toast.success({detail: "Th??nh C??ng", summary: 'X??a th??nh c??ng!', duration: 3000})
        this.router.navigate(["/"])
        window.location.href = "/"
      }, e => {
        console.log(e);
      });
    }
  }
  addCartForm = new FormGroup({
    quantity: new FormControl()
  })
  product: any;
  shop: User
  addToShoppingCart(product: Product, shop: User) {
    if (this.userId == null) {
      // @ts-ignore
      $('#exampleModalAdd').modal('hide');
      this.toast.error({detail:"L???i", summary: "C???n ????ng nh???p ????? c?? th??? mua h??ng!", duration: 3000})
      this.router.navigate(['/login'])
    }
    else {
      // @ts-ignore
      const cartItem: CartItem = {
        shop: shop,
        product: product,
        quantity: this.addCartForm.value.quantity,
      }
      console.log(cartItem);
      this.shoppingCartService.save(cartItem).subscribe((data) => {
        // @ts-ignore
        $('#exampleModalAdd').modal('hide');
        console.log(data)
      })
      this.toast.success({detail: "Th??nh C??ng", summary: 'Th??m v??o gi??? h??ng th??nh c??ng!', duration: 3000})
    }
  }
  findByIdProduct(id) {
    console.log(id)
    this.productService.findById(id).subscribe((data) => {
      this.product = data;
      console.log(data);
    })
  }
}

