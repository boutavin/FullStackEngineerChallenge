import Employee from '../../classes/Employee';

export default interface AdminEmployeeProps {
    employee: Employee;
    setEmployeeSettings: (employee: Employee | undefined) => void;
}
