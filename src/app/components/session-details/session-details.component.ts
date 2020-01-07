import { Component, Input } from '@angular/core';
import { Session } from '../../models/session.interface'

@Component({
    selector: 'session-details',
    template:`
        <p>{{ session.hours }}:{{ session.minutes }} - {{ session.date }} - {{ session.tag }}</p>
    `
})

export class SessionDetailsComponent {
    @Input()
    session: Session;
}