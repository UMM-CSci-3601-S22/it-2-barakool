import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductCategory } from '../products/product';
import { map } from 'rxjs/operators';
import { PantryItem } from './pantryItem';
import { isDate } from 'lodash';

@Injectable()
export class PantryService {
  readonly pantryUrl: string = environment.apiUrl + 'pantry';
  readonly productUrl: string = environment.apiUrl + 'product';

  ids: string[];
  i: number;
  products: Product[];

  constructor(private httpClient: HttpClient) {}

  getPantryItems(filters?: {category?: ProductCategory; name?: string}): Observable<PantryItem[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
      if (filters.name) {
        httpParams = httpParams.set('name', filters.name);
      }
    }
    return this.httpClient.get<PantryItem[]>(this.pantryUrl, {
      params: httpParams,
    });
  }

  filterItems(items: PantryItem[], filters: { category?: ProductCategory; name?: string }): PantryItem[] {

    let filteredItems = items;

    // Filter by name
    if (filters.name) {
      filters.name = filters.name.toLowerCase();

      filteredItems = filteredItems.filter(item => item.name.toLowerCase().indexOf(filters.name) !== -1);
    }

    // Filter by category
    if (filters.category) {
      filteredItems = filteredItems.filter(item => item.category.indexOf(filters.category) !== -1);
    }

    return filteredItems;
  }

  addPantryItem(newPantryItem: PantryItem): Observable<string> {
    // Send post request to add a new user with the user data as the body.
    return this.httpClient.post<{id: string}>(this.pantryUrl, newPantryItem).pipe(map(res => res.id));
  }

  getProducts(filters?: { category?: ProductCategory; store?: string }): Observable<Product[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
      if (filters.store) {
        httpParams = httpParams.set('store', filters.store);
      }
    }
    return this.httpClient.get<Product[]>(this.productUrl, {
      params: httpParams,
    });
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.productUrl + '/' + id);
  }

  deleteItem(id: string): Observable<PantryItem> {
    return this.httpClient.delete<PantryItem>(this.pantryUrl + '/' + id);
  }
}
