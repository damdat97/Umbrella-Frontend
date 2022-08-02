import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../service/product.service";
import {ImageService} from "../../../service/image.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  obj: any;
  id: any

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private imageService: ImageService) {
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
    this.getProduct();
  }

  getProduct() {
    this.productService.findById(this.id).subscribe((data) => {
      console.log(data)
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
            images: x
          })

          console.log(this.obj)
        })
    }, error => {
      console.log(error);
    })
  }

}
