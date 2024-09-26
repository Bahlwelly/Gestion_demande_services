import { inject, Injectable } from '@angular/core';
import { SrvService } from '../srv/srv.service';
import { Categorie, Srv } from '../../interfaces/srv';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private srvService = inject(SrvService);
  private souhaitesList : Srv[] = [];
  private souhaiteService = new BehaviorSubject<Srv[]> (this.souhaitesList);
  souhites$ = this.souhaiteService.asObservable();

  toggleSouhaite (souhaite : Srv) {
    const index = this.souhaitesList.indexOf(souhaite);
    if (index >= 0) {
      // If the item exists, remove it
      this.souhaitesList.splice(index, 1);
    } else {
      // If not, add it
      this.souhaitesList.push(souhaite);
    }
    this.souhaiteService.next(this.souhaitesList);
  }

  loadServices () : Observable<Srv[]> {
    return this.srvService.getServices();
  }

  laodCategories () : Observable<Categorie[]> {
    return this.srvService.getCategories();
  }

  private optionsDataSource = new BehaviorSubject<string[]>([]);
  private formDataSource = new BehaviorSubject<Srv>({id : "1", designation : '', description: '', categorie : 0, sous_categorie : '', etat : '', archivee : false, creiteres : []});
  currentData$ = this.optionsDataSource.asObservable();
  currentFormData$ = this.formDataSource.asObservable();

  changeOptionsData(data: string[]) {
    this.optionsDataSource.next(data);
  }

  changeFormData (service : Srv) {
    this.formDataSource.next(service);
  }

  constructor() { }
}
