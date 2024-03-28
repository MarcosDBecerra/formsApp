import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPagesComponent } from './pages/register-pages/register-pages.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'sign-up', component: RegisterPagesComponent },
      { path: '**', redirectTo: 'sign-up' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
