import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { LogOptionComponent } from './core/log-option/log-option.component';
import { AdminRegisterComponent } from './core/adminRegister/admin-register/admin-register.component';
import { ClientRegisterComponent } from './core/clientRegister/client-register/client-register.component';
import { MainComponent } from './pages/main/main.component';
import { ServicesListComponent } from './pages/services/services-list/services-list.component';
import { AppComponent } from './app.component';
import { AdminDetailsComponent } from './pages/services/servicesDetails/admin-details/admin-details.component';
import { ClientDetailsComponent } from './pages/services/servicesDetails/client-details/client-details.component';
import { SouhaitesComponent } from './pages/services/souhaites/souhaites.component';
import { ServicesFormComponent } from './pages/services/ajoute_service/services-form/services-form.component';
import { AjouteCritieresComponent } from './pages/services/ajoute_service/ajoute-critieres/ajoute-critieres.component';
import { ApercuComponent } from './pages/services/ajoute_service/apercu/apercu.component';
import { ModifierFormComponent } from './pages/services/modifierServices/modifier-form/modifier-form.component';
import { ModifierCriteresComponent } from './pages/services/modifierServices/modifier-criteres/modifier-criteres.component';
import { ModifierApercuComponent } from './pages/services/modifierServices/modifier-apercu/modifier-apercu.component';
import { ListFournisseursComponent } from './pages/Fournisseurs/list-fournisseurs/list-fournisseurs.component';
import { DetailsFournisseursComponent } from './pages/Fournisseurs/details-fournisseurs/details-fournisseurs.component';
import { AjouteFournisseursComponent } from './pages/Fournisseurs/ajoute-fournisseurs/ajoute-fournisseurs.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : 'log/option',
        pathMatch  : 'full'
    },
    {
        path : 'log/option',
        component : LogOptionComponent
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path: 'admin/register',
        component : AdminRegisterComponent
    },
    {
        path: 'client/register',
        component : ClientRegisterComponent
    },
    {
        path : 'main',
        component : MainComponent,
        children : [
            {
                path : 'services/list',
                component : ServicesListComponent,
            },
            {
                path : 'services/form',
                component : ServicesFormComponent
            },
            {
                path : 'services/ajoute/creiteres',
                component : AjouteCritieresComponent
            },
            {
                path : 'services/apercu',
                component : ApercuComponent
            },
            {
                path : 'services/admin/details/:id',
                component : AdminDetailsComponent,
            },
            {
                path : 'service/modifier/bases/:id',
                component : ModifierFormComponent
            },
            {
                path : 'service/modifier/criteres/:id',
                component : ModifierCriteresComponent
            },
            {
                path : 'service/modifier/apercu/:id',
                component : ModifierApercuComponent
            },
            {
                path : 'services/client/details/:id',
                component : ClientDetailsComponent
            },
            {
                path : 'souhaites',
                component : SouhaitesComponent
            },
            {
                path : 'fournisseurs/list',
                component : ListFournisseursComponent
            },
            {
                path : 'fournisseurs/ajouter',
                component : AjouteFournisseursComponent
            },
            {
                path : 'fournisseurs/details/:id',
                component : DetailsFournisseursComponent
            }
        ]
    },
];
