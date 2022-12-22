import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './../common/header/header.component';
import { FooterComponent } from './../common/footer/footer.component';
import { MainSectionComponent } from './../common/main-section/main-section.component';
import { HeroSectionComponent } from './../common/hero-section/hero-section.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainSectionComponent,
    HeroSectionComponent,
  ],
  imports: [CommonModule, LandingRoutingModule],
})
export class LandingModule {}
