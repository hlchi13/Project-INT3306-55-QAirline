import { BACKEND_BASE_URL } from "services/api";

export const useBooking = () => {
    const getAllBookings = async () => {
        const response = await fetch(`${BACKEND_BASE_URL}/book`, {
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }

    return {
        getAllBookings,
    }
}