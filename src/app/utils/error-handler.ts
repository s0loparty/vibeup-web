import type { AxiosError } from 'axios';

export interface ApiError {
	message: string;
	status?: number;
}

export function handleApiError(error: unknown): ApiError {
	const axiosError = error as AxiosError<{ message?: string }>;

	const status = axiosError.response?.status || axiosError.status;
	const message =
		axiosError.response?.data?.message ||
		axiosError.message ||
		'An unknown error occurred';

	return { message, status };
}
