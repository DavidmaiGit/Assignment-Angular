import { Component, OnInit } from "@angular/core";
import { Products } from "../products";
import { ServicesService } from "../services.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-productdetails",
  templateUrl: "./productdetails.component.html",
  styleUrls: ["./productdetails.component.scss"]
})
export class ProductdetailsComponent implements OnInit {
  constructor(
    private service: ServicesService,
    private active: ActivatedRoute
  ) {}
  produc: Products;
  productType : Products[];
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.active.params.subscribe(param => this.setProductId(param.id));
  }
  setProductId(id) {
    this.produc = this.service.getItemId(id); 
    this.setProductType(this.produc.type);
  }
  setProductType(type){
    this.productType = this.service.getItemType(type);
  }
  setCount(action) {
    let max = parseInt((document.querySelector("#input-count") as HTMLInputElement).max);
    let inp = (document.querySelector("#input-count") as HTMLInputElement);
    let index = parseInt(inp.value);
    if (action == "+") {
      if (index < max) {
        index++;
      }
    } else {
      if (index > 1) {
        index--;
      }
    }
    inp.value = "" + index;
  }
}
