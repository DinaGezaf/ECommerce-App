import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUserComponent } from './login-user/login-user.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductsComponent } from './products/products.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarUserComponent } from '../Shared/Shared Module/navbar-user/navbar-user.component';
import { NavbarComponent } from '../Shared/Shared Module/navbar/navbar.component';
import { FooterComponent } from '../Shared/footer/footer.component';
import { AppComponent } from '../app.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../Shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './slider/slider.component';
import { AttentionsComponent } from '../Shared/attentions/attentions.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../Core/Service/auth.interceptor';
import { UserViewComponent } from './User-View/user-view.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    AdminRegisterComponent,
    UserRegisterComponent,
    AboutUsComponent,
    AddProductComponent,
    HomeComponent,
    ProductDetailsComponent,
    ProductlistComponent,
    ProductsComponent,
    SidenavComponent,
    NavbarUserComponent,
    NavbarComponent,
    FooterComponent,
    SliderComponent,
    AttentionsComponent,
    UserViewComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class ComponentsModule {}
