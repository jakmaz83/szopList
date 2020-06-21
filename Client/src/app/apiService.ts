import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiStatusResponse } from './interfaces/ApiStatusResponse';
import { Product } from './product';

@Injectable()
export class ApiService {
  accessToken = null;

  constructor(private httpClient: HttpClient) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.accessToken}`,
      }),
    };
  }

  getStatus(): Promise<ApiStatusResponse> {
    return this.httpClient
      .get<ApiStatusResponse>(`${environment.apiUrl}/api/status`)
      .toPromise();
  }

  getProducts(): Promise<Array<Product>> {
    return this.httpClient
      .get<Array<Product>>(`${environment.apiUrl}/api/products`)
      .toPromise();
  }

  getProduct(id: string): Promise<Product> {
    return this.httpClient
      .get<Product>(`${environment.apiUrl}/api/products/${id}`)
      .toPromise();
  }

  createProduct(doc: Product): Promise<any> {
    return this.httpClient
      .post<Product>(
        `${environment.apiUrl}/api/products`,
        doc,
        this.httpOptions
      )
      .toPromise();
  }

  deleteProduct(id: string): Promise<number> {
    return this.httpClient
      .delete<number>(
        `${environment.apiUrl}/api/products/${id}`,
        this.httpOptions
      )
      .toPromise();
  }

  userLogin(userName: string, password: string): Promise<any> {
    return this.httpClient
      .post(`${environment.apiUrl}/api/login`, {
        token: btoa(`${userName}:${password}`),
      })
      .toPromise();
  }
  getCategories(): Promise<Array<any>> {
    return this.httpClient
      .get<Array<any>>(`${environment.apiUrl}/api/categories`)
      .toPromise();
  }

  getSingleCategory(id: string): Promise<Array<Product>> {
    return this.httpClient
      .get<Array<Product>>(`${environment.apiUrl}/api/category/${id}`)
      .toPromise();
  }
  addBasket(id: string): Promise<Product> {
    return this.httpClient
      .get<Product>(`${environment.apiUrl}/api/products/${id}/toggle-basket`)
      .toPromise();
  }
  getSingleTrueCategory(): Promise<Array<Product>> {
    return this.httpClient
      .get<Array<Product>>(`${environment.apiUrl}/api/category`)
      .toPromise();
  }
  getBasketProducts(): Promise<Array<Product>> {
    return this.httpClient
      .get<Array<Product>>(`${environment.apiUrl}/api/inBasket/`)
      .toPromise();
  }
  getNoBasketProducts(): Promise<Array<Product>> {
    return this.httpClient
      .get<Array<Product>>(`${environment.apiUrl}/api/noBasket/`)
      .toPromise();
  }
}
