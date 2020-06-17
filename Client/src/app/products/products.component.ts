import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products = null;

  constructor(apiService: ApiService) {
    apiService.getProducts().then((data) => {
      this.products = data;
    });
  }

  ngOnInit(): void {}
}
