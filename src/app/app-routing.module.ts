import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ChoiceComponent } from './components/choice-component/choice.component';
import { QuoteManagementComponent } from './components/quote-management/quote-management.component';
import { AchieveComponent } from './components/achieve/achieve.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'choice', component: ChoiceComponent, canActivate: [AdminGuard] },
  { path: 'quote-management', component: QuoteManagementComponent, canActivate: [AdminGuard]},
  { path: 'achieve', component: AchieveComponent, canActivate: [AdminGuard] },
  { path: 'switcher', component: SwitcherComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
