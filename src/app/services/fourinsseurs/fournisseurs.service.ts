import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from '../../interfaces/fournisseur';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {
  private http = inject(HttpClient);
  private fournisseursUrl = 'http://localhost:3000/fournisseurs';
  getFournisseurs () : Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.fournisseursUrl);
  }

  getFournisseurDetails (id : string) : Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.fournisseursUrl}/${id}`);
  }

  deleteFournisseur (id : string) : Observable<Fournisseur> {
    return this.http.delete<Fournisseur>(`${this.fournisseursUrl}/${id}`);
  }

  addFournisseur (frn : Fournisseur) : Observable<Fournisseur> {
    return this.http.post<Fournisseur>(`${this.fournisseursUrl}`, frn);
  }
  constructor() { }
}
