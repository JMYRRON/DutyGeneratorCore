import { DutyType } from "./duty_type";
import { Person } from "./person";
import {v4 as uuidv4} from 'uuid';

export class Duty {
  id: string;
  type: DutyType;
  date: Date;
  person: Person;

  constructor(item:any){
    this.id = uuidv4();
    this.type = item.type;
    this.date = item.date;
    this.person = item.person ?? undefined;
  }
}
