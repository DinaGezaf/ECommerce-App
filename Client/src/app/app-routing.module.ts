import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { ProductlistComponent } from './Components/productlist/productlist.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { AdminRegisterComponent } from './Components/admin-register/admin-register.component';
import { UserViewComponent } from './Components/User-View/user-view.component';
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'products', component: UserViewComponent },
  {
    path: 'products/product/details/:productCode',
    component: ProductDetailsComponent,
  },
  {
    path: 'register/user',
    component: UserRegisterComponent,
  },
  {
    path: 'home',
    component: SidenavComponent,
    children: [
      { path: '', component: ProductlistComponent },
      { path: 'products', component: ProductlistComponent },
      { path: 'addProduct/new', component: AddProductComponent },
      {
        path: 'products/editProduct/:productCode',
        component: AddProductComponent,
      },
      {
        path: 'register/admin',
        component: AdminRegisterComponent,
      },
      {
        path: 'products/product/details/:productCode',
        component: ProductDetailsComponent,
      },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
