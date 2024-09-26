import { Component, inject } from '@angular/core';
import { Categorie, Srv } from '../../../../interfaces/srv';
import { SrvService } from '../../../../services/srv/srv.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { enableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-modifier-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './modifier-form.component.html',
  styleUrl: './modifier-form.component.css'
})
export class ModifierFormComponent {
  serviceModifier! : Srv;
  private srvService = inject(SrvService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  categoriesObj! : Categorie[];
  selectedCategorieId: string = '';
  sous_categories: string[] = [];
  selectedSousCategorie: string = '';

  ngOnInit () {
    this.loadCategories();
    this.loadService()
    console.log('Modifier Form Works!!!!!');
  }
  
  loadService () {
    const id = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.srvService.getServiceDetails(id).subscribe(data => {
        this.serviceModifier = data;
        console.log(this.serviceModifier.categorie);
        
        this.intializeService();
      });
    }
  }
  
  intializeService() {
    this.selectedCategorieId = this.serviceModifier.categorie.toString();
    this.loadSousCategories(); 
  }

  loadCategories () {
    this.srvService.getCategories().subscribe((data) => {
      this.categoriesObj = data;
    });
  }

  onCategorieChange (event : Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedCategorieId = selectedValue;

    this.loadSousCategories();
  }

  loadSousCategories () {
    if (this.selectedCategorieId) {
      const selectedCategorie = this.categoriesObj.find(cat => cat.id === this.selectedCategorieId);
      localStorage.setItem('selectedCategorieId', selectedCategorie!.id);
      if (selectedCategorie && selectedCategorie.sous_categories) {
        this.sous_categories = selectedCategorie.sous_categories;
      }
      else {
        this.sous_categories = [];
      }
    }
    else {
      this.sous_categories = [];
    }
    this.selectedSousCategorie = '';
  }

  onSousCategorieChange (event : Event) {
    this.selectedSousCategorie = (event.target as HTMLSelectElement).value;
    this.loadSousCategories();
  }

  modifier() {
    this.srvService.updateAttributes(this.serviceModifier.id, this.serviceModifier.designation, this.serviceModifier.description, this.serviceModifier.categorie, this.serviceModifier.sous_categorie).subscribe(responce => {
      alert('Atrributes modifiee !!');
      console.log(this.serviceModifier.categorie);
    })
  }

  suivant (form : NgForm) {
    if (form.valid) {
      this.router.navigate(['/main/service/modifier/criteres/', this.serviceModifier.id]);
      this.modifier();
    }
    else {
      alert('error');
    }
  }
}
