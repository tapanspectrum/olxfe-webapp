import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private APIURL = environment.apiUrl;

  // http://localhost:3000/api/v1/ads/690ca8cdc921f48e325dd044


  constructor(private http: HttpClient) { }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.APIURL}/ads/${id}`).pipe(map((res: any) => {
      return res.data;
    }));
  }
}
