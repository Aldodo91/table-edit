import { Component, OnInit } from "@angular/core";
import { ImportsModule } from "./imports";
import { MessageService, SelectItem } from "primeng/api";
import { Product } from "@domain/product";
import { ProductService } from "@service/productservice";
@Component({
  selector: "table-row-edit-demo",
  templateUrl: "table-row-edit-demo.html",
  standalone: true,
  imports: [ImportsModule],
  providers: [MessageService, ProductService],
})
export class TableRowEditDemo implements OnInit {
  products!: Product[];

  statuses!: SelectItem[];

  clonedProducts: { [s: string]: Product } = {};

  colums = ["Codes", "Name", "Inventory Status", "Price", "Edit"];
  dummyRow: Product = {
    code: "",
    name: "",
    price: 0,
    inventoryStatus: "",
    editable: true,
    id: "",
  };

  buttonAddDisabled = false;

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.products = this.productService
      .getProductsData()
      .slice(0, 6)
      .map((e) => {
        return { ...e, editable: false };
      });

    this.statuses = [
      { label: "In Stock", value: "INSTOCK" },
      { label: "Low Stock", value: "LOWSTOCK" },
      { label: "Out of Stock", value: "OUTOFSTOCK" },
      { label: "Finito", value: "DA ORDINARE" },
    ];
  }

  onRowEditInit(product: Product) {
    product.editable = false;
    this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: Product) {
    if (product.price > 0) {
      delete this.clonedProducts[product.id as string];
      this.products = this.products.map((e) => {
        return { ...e, editable: false };
      });
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Product is updated",
      });
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Invalid Price",
      });
    }
    console.log(this.products);
    this.buttonAddDisabled = false;
  }

  onRowEditCancel(product: Product, index: number) {
    product.editable = true;
    this.products[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
    this.products.pop();
    this.buttonAddDisabled = false;
  }

  getSeverity(status: string) {
    switch (status) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warning";
      case "OUTOFSTOCK":
        return "danger";
    }
  }
  addRow() {
    const dummyRow = { ...this.dummyRow };
    this.products = [...this.products, { ...dummyRow, id: `${Math.random()}` }];
    this.buttonAddDisabled = true;
  }
}
