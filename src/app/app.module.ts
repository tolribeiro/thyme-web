import { BrowserModule, Title } from '@angular/platform-browser';
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
import { DeviceDetectorModule } from 'ngx-device-detector';
import { TimerComponent } from './components/timer/timer.component';
import { TasksComponent } from './components/tasks/tasks.component';

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
    HomeComponent,
    TimerComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    DeviceDetectorModule.forRoot()
  ],
  providers: [ Title ],
  bootstrap: [AppComponent], 
  exports: []
})

export class AppModule {

 }
