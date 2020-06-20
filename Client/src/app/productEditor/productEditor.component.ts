import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-productEditor',
  templateUrl: './productEditor.component.html',
  styleUrls: ['./productEditor.component.scss'],
})
export class ProductEditorComponent implements OnInit {
  name = '';
  productCategoryId = null;
  accessToken = null;
  products = [];
  categories = [];
  basket = false;

  constructor(private apiService: ApiService) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  ngOnInit(): void {
    this.apiService
      .getProducts()
      .then((products) => (this.products = products));
    this.apiService
      .getCategories()
      .then((categories) => (this.categories = categories));
  }

  handleSave() {
    const doc: any = {
      name: this.name,
      productCategoryId: this.productCategoryId,
      basket: this.basket,
    };

    this.apiService.createProduct(doc).then(() => window.location.reload());
  }

  handleDelete(id: string) {
    this.apiService.deleteProduct(id).then(() => {
      window.location.reload();
    });
  }
}
