import { useState, useEffect } from 'react';
import Api from '../Api';
import Employee from '../classes/Employee';

export default function useEmployees(): [
    Employee[],
    React.Dispatch<React.SetStateAction<Employee[]>>
] {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await Api.getEmployees();
            setEmployees(data);
        };
        fetch();
    }, []);

    return [employees, setEmployees];
}