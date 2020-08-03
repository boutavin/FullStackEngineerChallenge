import axios from 'axios';
import Employee from './classes/Employee';
import Review from './classes/Review';

export interface ErrorResponse {
    error: true;
    msg: string;
}

const API_PATH = `http://localhost:5000/api`;

async function getEmployees() {
    const response = await axios.get<Employee[]>(`${API_PATH}/employees`);
    return response;
}

async function getEmployee(id: number) {
    const response = await axios.get<Employee | ErrorResponse>(`${API_PATH}/employee/${id}`);
    return response;
}

async function getEmployeeReviews(id: number) {
    const response = await axios.get<Review[]>(`${API_PATH}/employee/${id}/reviews`);
    return response;
}

async function deleteEmployee(id: number) {
    const response = await axios.delete<Employee[] | ErrorResponse>(`${API_PATH}/employee/${id}`);
    return response;
}

async function addEmployee(name: string) {
    const response = await axios.post<Employee[] | ErrorResponse>(`${API_PATH}/employee`, { name });
    return response;
}

async function updateEmployee(id: number, name: string) {
    const response = await axios.patch<Employee[] | ErrorResponse>(`${API_PATH}/employee`, { id, name });
    return response;
}

async function getReviews() {
    const response = await axios.get<Review[]>(`${API_PATH}/reviews`);
    return response;
}

async function getReview(id: number) {
    const response = await axios.get<Review | ErrorResponse>(`${API_PATH}/review/${id}`);
    return response;
}

async function deleteReview(id: number) {
    const response = await axios.delete<Review[] | ErrorResponse>(`${API_PATH}/review/${id}`);
    return response;
}

async function addReview(ownerId: number, approvers: number[]) {
    const response = await axios.post<Review[] | ErrorResponse>(`${API_PATH}/review`, { ownerId, approvers });
    return response;
}

async function updateReview(id: number, ownerId: number, approvers: number[]) {
    const response = await axios.patch<Review[] | ErrorResponse>(`${API_PATH}/review`, { id, ownerId, approvers });
    return response;
}

async function getReviewForFeedback(id: number, approver: number) {
    const response = await axios.get<Review | ErrorResponse>(`${API_PATH}/review/${id}/feedback/${approver}`);
    return response;
}

async function addReviewFeedback(id: number, approver: number, feedback: number) {
    const response = await axios.post<Review[] | ErrorResponse>(`${API_PATH}/review/feedback`, { id, approver, feedback });
    return response;
}

export default {
    getEmployees,
    getEmployee,
    getEmployeeReviews,
    deleteEmployee,
    addEmployee,
    updateEmployee,
    getReviews,
    getReview,
    deleteReview,
    addReview,
    updateReview,
    getReviewForFeedback,
    addReviewFeedback
};