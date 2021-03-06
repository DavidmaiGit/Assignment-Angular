import { Component, OnInit } from '@angular/core';
import { Products } from '../dataBean';
import { ServicesService } from '../services.service';
import { ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { NgbActiveModal, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngbd-modal-content',
  styles: [`
    .dark-modal .modal-content {
      background-color: rgba(#292b2c, 0);
    }
  `],
  template: `
  <button class="btn btn-warning w-100">
      <span class="spinner-border spinner-border-sm"></span>
      Vui lòng đợi lấy dữ liệu..
  </button>
  `
})
export class modalLoadType {
  constructor(public activeModal: NgbActiveModal) { }
}
@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  constructor(
    private service: ServicesService,
    private active: ActivatedRoute,
    private titleService: Title,
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  listItem: Products[];
  listPage: Products[];
  typeParam;
  typeName;
  typeDesc;
  page;
  indexPage = 1;
  maxpage;
  titlePage;
  fullType: Products[];
  ngOnInit(): void {
    this.page = 1;
    this.active.params.subscribe(param => this.setProductType(param.type));
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  showPage() {
    let index = 0;
    if (this.listItem.length > 12) {
      for (var i = 1; i < this.page; i++) {
        index += 12;
      }
    }
    this.listPage = this.listItem.slice(index, index + 12);
  }
  setProductType(type) {
    this.openVerticallyCentered(modalLoadType);
    this.typeParam = type;
    switch (type) {
      case "DIS": { this.typeName = "Màn hình"; this.typeDesc = "Màn hình chính hãng chất lượng tuyệt đối, hỗ trợ trả góp 0%";; break; }
      case "CHA": { this.typeName = "Ghế"; this.typeDesc = "Ghế gaming đáp ứng mọi nhu cầu, khuyến mãi cho sinh viên"; break; }
      case "KEY": { this.typeName = "Bàn phím"; this.typeDesc = "Bàn phím cơ hàng đầu cho mọi đối tượng"; break; }
      case "HEA": { this.typeName = "Tai nghe"; this.typeDesc = "Tai nghe cao cấp cho game thủ"; break; }
      case "MOU": { this.typeName = "Chuột"; this.typeDesc = "Chuột gaming chính hãng bảo hành 24 tháng"; break; }
    }
    this.titleService.setTitle(this.typeDesc);
    this.service.getProduct().subscribe(responese => this.loadProduct(responese, type), error => console.log(error));
  }
  loadProduct(list, type) {
    this.fullType = list.filter(item => item.type == type);
    this.listItem = this.fullType;
    this.listPage = this.listItem.slice(0, 12);
    this.maxpage = Math.ceil(this.listItem.length / 12) * 10;
    this.modalService.dismissAll();
  }
  searchName(text) {
    if (text != "") {
      this.listItem = this.fullType.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
    } else {
      this.listItem = this.fullType;
    }
    this.maxpage = Math.ceil(this.listItem.length / 12) * 10;
    this.showPage();
  }
}
