import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './containers/login-screen/login-screen.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { SessionDetailsComponent } from './components/session-details/session-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

const CALLBACK_PATH = 'implicit/callback';

const appRoutes: Routes = [
  { path: 'login', component: LoginScreenComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: '', component: HomeComponent }
  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    UserDashboardComponent,
    SessionDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent], 
  exports: []
})

export class AppModule {

 }
