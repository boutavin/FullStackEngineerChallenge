import Employee from '../../classes/Employee';

export default interface AdminEmployeeSettingsProps {
    employee: Employee | undefined;
    deleteEmployee: (employee: Employee) => void;
    saveEmployee: (id: number, name: string) => void;
}
