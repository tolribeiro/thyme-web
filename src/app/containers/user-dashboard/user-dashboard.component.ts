import { Component, Input } from '@angular/core';
import { Session } from '../../models/session.interface';
import { User } from 'src/app/models/user.interface';

@Component({
    selector: 'user-dashboard',
    styleUrls: ['user-dashboard.component.scss'],
    template: `
        <h1>Dashboard</h1>
        <h3>List of sessions</h3>
        <p>Welcome, {{ user.name }}</p>
        <span *ngFor="let session of sessions">
            <session-details [session]="session"></session-details>
        </span>
    `
})

export class UserDashboardComponent {
    @Input()
    user: User;
    
    sessions: Session[] = [
        {
            date: "Sep 5 at 1:52 PM",
            hours: 0,
            minutes: 50,
            seconds: 0,
            tag: "Coisas de casa"
        },
        {
            date: "Sep 2 at 5:12 PM",
            hours: 2,
            minutes: 30,
            seconds: 0,
            tag: "Jamp stuff"
        }
    ];
    
    constructor() {}
}