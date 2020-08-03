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

    toJSON() {
        return {
            id: this.id,
            name: this.name
        };
    }

    static fromJSON({ id, name }: { id: number, name: string }) {
        return new Employee(id, name);
    }
}
