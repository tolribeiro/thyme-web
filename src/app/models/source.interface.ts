import { Session } from '../models/session.interface';

export interface Source {
    id: number,
    desc: string,
    sessions: Session[]
}