import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent} from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { ProductComponent } from 'src/app/components/product/product.component';

const routes: Routes = [
    { 
        path: '', 
        component: LayoutComponent,
        pathMatch: 'prefix',
        children: [
            {
              path: 'admin', // child route path
              component: AdminComponent, // child route component that the router renders
              pathMatch: 'full'
            },
            { 
                path:'',
                redirectTo:'admin',
                pathMatch: 'full'
            },
            {
                path: 'products', // child route path
                component: ProductComponent, // child route component that the router renders
                pathMatch: 'full'
              },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }