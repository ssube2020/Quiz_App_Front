import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ChoiceComponent } from './components/choice-component/choice.component';
import { QuoteManagementComponent } from './components/quote-management/quote-management.component';
import { AchieveComponent } from './components/achieve/achieve.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ChoiceComponent,
    QuoteManagementComponent,
    AchieveComponent,
    SwitcherComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [   {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
