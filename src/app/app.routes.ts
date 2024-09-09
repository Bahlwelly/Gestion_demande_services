import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServicesListComponent } from './pages/page_services/services-list/services-list.component';
import { ServicesFormComponent } from './pages/page_services/ajoute_service/services-form/services-form.component';
import { ServicesDetailsComponent } from './pages/page_services/services-details/services-details.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : 'dashboard',
        pathMatch : 'full'
    },
    {
        path : 'dashboard',
        component : DashboardComponent
    },
    {
        path : 'list_services',
        component : ServicesListComponent
    },
    {
        path : 'services_form',
        component : ServicesFormComponent
    },
    {
        path : 'service_details/:id',
        component : ServicesDetailsComponent
    }
];
