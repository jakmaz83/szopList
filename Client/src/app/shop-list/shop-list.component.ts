import { Component, OnInit } from '@angular/core';

import { ApiService } from '../apiService';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent {
  products = [];
  constructor(private apiService: ApiService) {
    apiService.getSingleTrueCategory().then((data) => {
      this.products = data;
    });
  }
  ngOnInit(): void {}
}
