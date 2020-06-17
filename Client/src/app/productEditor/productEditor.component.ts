import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-productEditor',
  templateUrl: './productEditor.component.html',
  styleUrls: ['./productEditor.component.scss'],
})
export class ProductEditorComponent implements OnInit {
  name = '';
  category = '';
  maxPrice = '';
  accessToken = null;
  products = [];

  constructor(private apiService: ApiService) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  ngOnInit(): void {
    this.apiService
      .getProducts()
      .then((products) => (this.products = products));
  }

  handleSave() {
    const doc: any = {
      name: this.name,
      category: this.category,
      maxPrice: this.maxPrice,
    };

    this.apiService.createProduct(doc).then(() => window.location.reload());
  }

  handleDelete(id: string) {
    this.apiService.deleteProduct(id).then(() => {
      window.location.reload();
    });
  }
}
