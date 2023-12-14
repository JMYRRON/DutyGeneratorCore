export class DutyType {
  id: number;
  name: string;
  description: string;
  type: string;
  options: number[];
  index: number;

  constructor(item: any) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.type = item.type;
    this.options = item.options;
    this.index = item.index;
  }
}
