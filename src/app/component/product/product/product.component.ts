import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {ImageService} from "../../../service/image.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() data:any = {}

  @Output() item = new EventEmitter()

  constructor(private productService: ProductService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.productService.getAll().subscribe(data => {
      for (let i =0; i<data.length; i++) {
          this.imageService.findAllByProductId(data[i].id).subscribe((x)=> {
          this.data.push({
            id: data[i].id,
            name:data[i].name,
            description: data[i].description,
            price: data[i].price,
            quantity: data[i].quantity,
            category: data[i].category,
            owner: data[i].owner,
            images: x
          })

          console.log(this.data)
        })
      }

    }, error => {
      console.log(error);
    })
  }

  add() {
    this.item.emit(this.data)
  }

}
