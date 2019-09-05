import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'login-screen',
    styleUrls: ['login-screen.component.scss'],
    template: `
        <div class="login-box">
            <h1>Thyme</h1>
            <div class="form">
                <!-- Email -->
                <div>
                    <input type="text" placeholder="Enter e-mail">
                </div>
                <!-- Password -->
                <div>
                    <input type="password" placeholder="Enter password">
                </div>
                <div>
                    <button type="submit" (click)="clickToLogin()">Sign in</button>
                </div>
            </div>
        </div>
    `
})

export class LoginScreenComponent {
    isUserLoggedIn: boolean = false;
    @Output()
    login: EventEmitter<boolean> = new EventEmitter();
    constructor() {}

    clickToLogin() {
        console.log("clicked to login");
        this.isUserLoggedIn = true;
        if (this.isUserLoggedIn) {
            this.login.emit(true);
        }
    }
}