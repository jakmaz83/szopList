import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../apiService';
import { Product } from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  product: Product = null;

  constructor(activatedRoute: ActivatedRoute, apiService: ApiService) {
    activatedRoute.params.subscribe((params) => {
      apiService
        .getProduct(params.id)
        .then((product) => (this.product = product));
    });
  }
}
