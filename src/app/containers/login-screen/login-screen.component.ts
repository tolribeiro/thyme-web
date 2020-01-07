import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'login-screen',
    styleUrls: ['login-screen.component.scss'],
    templateUrl: `login-screen.component.html`
})

export class LoginScreenComponent {
    loginForm: FormGroup;
    submitted = false;
    user: User = new User();
    areCredentialsWrong: boolean = false;
    
    constructor(private router: Router, 
                private formBuilder: FormBuilder, 
                private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.setValidatorsForm();
    }

    setValidatorsForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;
        this.isFormInvalid();
        this.setUserWithFormValues(this.f.email.value, this.f.password.value);
        this.navigateUserToDashboard(this.user);
    }

    doesFormContainErrors(inputField: any) {
        return this.submitted && inputField.errors;
    }

    isFieldRequired(inputField: any) {
        return inputField.errors.required;
    }

    isFormInvalid() {
        if (this.loginForm.invalid) {
            return;
        }
    }
    
    setUserWithFormValues(email: string, pwd: string) {
        this.user.email =  email;
        this.user.pwd =  pwd;
    }

    navigateUserToDashboard(user: User) {
        if (this.authenticationService.login(this.user)) {
            this.router.navigate(['dashboard']);
        } else {
            if (!this.doesFormContainErrors(this.f.email) && !this.doesFormContainErrors(this.f.password)) {
                this.areCredentialsWrong = true;
            }
        }
    }

    get f() { return this.loginForm.controls; } 
}