import { Component } from '@angular/core';
import { User } from './models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'thyme';
  isUserSignedIn: boolean = false;
  user: User = { name: 'Thiago' };

  ngOnInit() {
    
  }

  handleLogin(event: boolean) {
    console.log("User has signed in: " + event);
    this.isUserSignedIn = true;
  }
}
