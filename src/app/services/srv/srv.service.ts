import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Categorie, Srv } from '../../interfaces/srv';

@Injectable({
  providedIn: 'root'
})
export class SrvService {
  private servicesApiUrl = "http://localhost:3000/Services";
  private categoriesApiUrl = "http://localhost:3000/Categories";

  private http = inject(HttpClient);

  getServices () : Observable<Srv[]> {
    return this.http.get<Srv[]>(this.servicesApiUrl);
  }

  getServiceDetails (id : number) : Observable<Srv> {
    return this.http.get<Srv>(`${this.servicesApiUrl}/${id}`);
  }

  getCategories () : Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.categoriesApiUrl);
  }

  constructor() { }
}
