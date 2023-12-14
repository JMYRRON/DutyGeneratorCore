import moment from "moment";
import { DutyType } from "./classes/duty_type";
import { Person } from "./classes/person";
import { Unit } from "./classes/unit";
import { log } from "console";
import { Duty } from "./classes/duty";
import { DutyMatrix } from "./models/matrix";

const units = require("./mocks/units.json").map((item: any) => {
  return new Unit(item.uuid, item.name);
});
const duty_types = require("./mocks/duty_types.json").map((item: any) => {
  return new DutyType(item);
});
const persons = require("./mocks/persons.json").map((item: any) => {
  const unit: Unit = units.find((unit: Unit) => unit.id === item.unit.id);
  let duties: DutyType[] = [];
  for (let i of item.available_duty_types) {
    let type = duty_types.find((type: DutyType) => type.id === i.id);
    duties.push(type);
  }
  return new Person(item, unit, duties);
});

let days_in_month = moment().daysInMonth();

let duties: Duty[] = [];

for (let i = 1; i < days_in_month + 1; i++) {
  let day = moment().date(i);
  for (let duty_type of duty_types) {
    let duty = new Duty({
      type: duty_type,
      date: new Date(day.format("YYYY-MM-DD")),
    });
    if (duty_type.type === "everyday") {
      duties.push(duty);
    }
    if (duty_type.type === "weekends" && [0, 6].includes(day.weekday())) {
      duties.push(duty);
    }
    if (duty_type.type === "manual" && duty_type.options.includes(day.date())) {
      duties.push(duty);
    }
  }
}
const duty_types_number: number = duty_types.length;
DutyMatrix.display(
  duties,
  days_in_month,
  duty_types_number,
  persons,
  duty_types,
);
// log(duties.length);
