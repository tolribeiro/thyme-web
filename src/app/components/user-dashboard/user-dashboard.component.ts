import { Component, Input } from '@angular/core';
import { Session } from '../../models/session.interface';
import { User } from 'src/app/models/user';
import { Source } from 'src/app/models/source.interface';

@Component({
    selector: 'user-dashboard',
    styleUrls: ['user-dashboard.component.scss'],
    templateUrl: `user-dashboard.component.html`
})

export class UserDashboardComponent {
    @Input()
    user: User;
    sources: Source[] = [
        {
            id: 123,
            desc: "iMac",
            sessions: [
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
            ] 
        },
        {
            id: 222,
            desc: "Mac Pro",
            sessions: [
                {
                    date: "Jan 7 at 12:35 PM",
                    hours: 0,
                    minutes: 12,
                    seconds: 0,
                    tag: "Trampo"
                },
                {
                    date: "Jan 2 at 1:24 AM",
                    hours: 1,
                    minutes: 21,
                    seconds: 0,
                    tag: "Medline"
                }
            ] 
        }
    ];
    
    constructor() {}
}