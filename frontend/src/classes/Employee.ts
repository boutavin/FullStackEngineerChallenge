export default class Employee {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    setName(name: string) {
        this.name = name;
    }
}
