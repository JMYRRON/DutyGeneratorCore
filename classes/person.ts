import { log } from "console";
import { DutyType } from "./duty_type";
import { Unit } from "./unit";

export class Person {
  id: string;
  name: string;
  surname: string;
  unit: Unit;
  duty_counter: number;
  holiday_duty_counter: number;
  available_duty_types: DutyType[];

  constructor(item: any, unit: Unit, duties: DutyType[]) {
    this.id = item.id;
    this.name = item.name;
    this.surname = item.surname;
    this.unit = unit;
    this.available_duty_types = duties;
    this.duty_counter = item.duty_counter;
    this.holiday_duty_counter = item.holiday_duty_counter;
  }

  static save(data: Person[]): void{
    require("fs").writeFile('./mocks/person.json', JSON.stringify(data), (err: Error) => {log(err)})
    // require('fs')
    //   .writeFileSync('./../mocks/persons.json', JSON.stringify(data))
  }
}
