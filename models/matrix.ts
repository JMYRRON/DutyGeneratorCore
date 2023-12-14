import { log } from "console";
import { Duty } from "./../classes/duty";
import { Person } from "../classes/person";
import { DutyType } from "../classes/duty_type";

export abstract class DutyMatrix {
  static display(
    data: Duty[],
    days_number: number,
    types_number: number,
    persons: Person[],
    types: DutyType[],
  ): void {
    let matrix: number[][] = new Array(types_number)
      .fill(0)
      .map(() => new Array(days_number).fill(0));

    let dutyMatrix: number[][] = new Array(persons.length)
      .fill(0)
      .map(() => new Array(days_number).fill(0));

    let black_dates: Map<Person, number[]> = new Map();
    black_dates.set(
      persons[0],
      Array.from({ length: 31 }, (_, i) => i + 1),
    ); // 001 - 3
    black_dates.set(persons[1], [2]); // 002 - 2
    black_dates.set(persons[2], [5]); // 003 - 5
    black_dates.set(persons[3], [3]); // 004 - 3
    black_dates.set(persons[4], [24]); // 005 - 24
    black_dates.set(persons[5], [26]); // 006 - 26
    black_dates.set(persons[6], [23]); // 007 - 23
    black_dates.set(persons[7], [27]); // 008 - 27;
    black_dates.set(persons[8], [5]); // 009 - 5;
    black_dates.set(persons[9], [28]); // 010 - 28;

    // log(black_dates.get(persons[0]));

    let black_list: Person[] = [];
    for (let duty of data) {
      matrix[duty.type.index][duty.date.getDate() - 1] = 1;

      if (black_list.length === persons.length) {
        black_list = [];
      }

      let candidate: Person = this.getCandidate(
        duty,
        persons,
        black_list,
        black_dates,
      );

      duty.person = candidate;

      black_list.push(candidate);

      let personIndex = persons.indexOf(candidate);
      dutyMatrix[personIndex][duty.date.getDate() - 1] = duty.type.index + 1;
    }

    Person.save(persons)

    log(dutyMatrix);

    // for(let type of types){
    //   log(matrix[type.index].filter(i => i == 1).length / persons.filter(p => p.available_duty_types.includes(type)).length);
    // }
  }

  private static getCandidate(
    duty: Duty,
    persons: Person[],
    black_list: Person[],
    black_dates: Map<Person, number[]>,
  ): Person {
    let list: Person[] = persons.filter(
      (p: Person) => !black_dates.get(p)?.includes(duty.date.getDate()),
    );

    let test: Person[] = list.filter(
      (p: Person) =>
        !black_list.includes(p) && p.available_duty_types.includes(duty.type),
    );

    if (test.length === 0) {
      test = list.filter((p: Person) =>
        p.available_duty_types.includes(duty.type),
      );
    }
    
    let candidate: Person;
    if([0,6].includes(duty.date.getDay())){
      candidate = test.sort((a: Person, b: Person) => {
          return a.holiday_duty_counter - b.holiday_duty_counter;
        })[0];
      candidate.holiday_duty_counter++;
    } else {
      candidate = test.sort((a: Person, b: Person) => {
          return a.duty_counter - b.duty_counter;
        })[0];
    }

    candidate.duty_counter++;
    return candidate;
  }

  static displayTypesToPersons(persons: Person[], types: DutyType[]): void {
    for (let type of types) {
      log(
        type.name,
        persons.filter((p) => p.available_duty_types.includes(type)).length,
      );
    }
  }
}
