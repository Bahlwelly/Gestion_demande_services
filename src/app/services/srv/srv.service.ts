import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Categorie, Srv } from '../../interfaces/srv';
import { Fournisseur } from '../../interfaces/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class SrvService {
  private servicesApiUrl = "http://localhost:3000/Services";
  private categoriesApiUrl = "http://localhost:3000/Categories";
  private fournisseursUrl = 'http://localhost:3000/fournisseurs'

  private http = inject(HttpClient);

  getServices () : Observable<Srv[]> {
    return this.http.get<Srv[]>(this.servicesApiUrl);
  }

  updateService (id : string, service : Srv) : Observable<Srv> {
    return this.http.put<Srv>(`${this.servicesApiUrl}/${id}`, service);
  }

  addService (service : Srv) : Observable<Srv> {
    return this.http.post<Srv>(`${this.servicesApiUrl}`,service);
  }

  deleteService (id : string) : Observable<Srv> {
    return this.http.delete<Srv>(`${this.servicesApiUrl}/${id}`);
  }

  getServiceDetails (id : string) : Observable<Srv> {
    return this.http.get<Srv>(`${this.servicesApiUrl}/${id}`);
  }

  archiverService (id : string) : Observable<Srv> {
    return this.http.get<Srv>(`${this.servicesApiUrl}/${id}`).pipe(switchMap(service => {
      service['archivee'] = true;
      return this.http.put<Srv>(`${this.servicesApiUrl}/${id}`, service)
    }))
  }

  updateAttributes (id : string, designation :string, description : string, categorie : number, sous_categorie :string) : Observable<Srv> {
    return this.http.get<Srv>(`${this.servicesApiUrl}/${id}`).pipe(switchMap(service => {
      service['designation'] = designation;
      service['description'] = description;
      service['categorie'] = categorie;
      service['sous_categorie'] = sous_categorie;
      return this.http.put<Srv>(`${this.servicesApiUrl}/${id}`, service);
    }));
  }

  updateCriteres (id : string, critere :string[]) {
    return this.http.get<Srv>(`${this.servicesApiUrl}/${id}`).pipe(switchMap(service => {
      service['creiteres'] = critere;
      return this.http.put<Srv>(`${this.servicesApiUrl}/${id}`, service);
    }));
  }

  getCategories () : Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.categoriesApiUrl);
  }

  constructor() { }
}
