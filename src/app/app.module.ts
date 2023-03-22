import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SignUpComponent } from './auth/signup/signup.component';
import { SignInComponent } from './auth/signin/signin.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { GlobalHttpInterceptorService } from './interceptors/global.http.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { LandingModule } from './landing/landing.module';
import { AuthGuard } from './services/auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ForgotpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    LandingModule,
    ReactiveFormsModule,
    AdminDashboardModule,
    CarouselModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
