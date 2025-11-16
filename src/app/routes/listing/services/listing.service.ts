import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  apiUrlLink = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  // http://localhost:3000/api/v1/ads?page=1&limit=10&adType=vehicles&search=toyota

  getAdsList(params: any): Observable<any> {
    console.log('Listing Service Params:', params);
    if (!params) {
      return this.http.get<any>(this.apiUrlLink);
    }
    return this.http.get<any>(this.apiUrlLink, { params });
  }

  getAdDetails(adId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlLink}/ads/${adId}`);
  }

  getFilterDropDownData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlLink}/ads/dropdown-values`).pipe(map(res => res.data));
  }

  // filterAds(filterParams: any): Observable<any> {
  //   // http://localhost:3000/api/v1/ads/filter?category=vehicles&keyword=Focus
  //   return this.http.get<any>(this.apiUrlLink, { params: filterParams });
  // }

  filterAds(filters: any): Observable<any> {
    let params = new HttpParams();

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.append(key, filters[key]);
      }
    });

    console.log('Filter Ads Params:', params.toString());

    return this.http.get<any>(`${this.apiUrlLink}/ads/filter`, { params });
  }

  // http://localhost:3000/api/v1/trending-keyword
  getTrendingKeywords(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/trending-keyword`).pipe(map(res => res.data));
  }

  createTrendingKeywords(params:any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/trending-keyword`, params);
  }

}
