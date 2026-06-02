import { Routes } from '@angular/router';
import { AdminLogin } from './Components/admin-login/admin-login';
import { FarmerDashboard } from './Components/farmer-dashboard/farmer-dashboard';
import { FarmerRegister } from './Components/farmer-register/farmer-register';
import { Schemes } from './Components/schemes/schemes';

export const routes: Routes = [
  {
    path: 'admin-login',
    component: AdminLogin
  },
  {
    path: 'farmer-register',
    component: FarmerRegister
  },
  {
    path: 'farmer-dashboard',
    component: FarmerDashboard
  },
  {
    path: 'schemes',
    component: Schemes
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'farmer-register',
    
  }
];
