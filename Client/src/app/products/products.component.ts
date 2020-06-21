import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products = null;
  accessToken = null;

  constructor(private apiService: ApiService) {
    apiService.getProducts().then((data) => {
      this.products = data;
      this.accessToken = localStorage.getItem('accessToken');
    });
  }
  onClick(value) {
    console.log(value);
  }

  ngOnInit(): void {}
  addBasket(id: string) {
    this.apiService.addBasket(id).then(() => {
      window.location.reload();
    });
  }
}
