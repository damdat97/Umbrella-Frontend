import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  obj: any = [];
  id: any

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService) {
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

}
