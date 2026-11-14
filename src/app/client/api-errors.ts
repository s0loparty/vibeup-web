/** Тело ошибки, возвращаемое Laravel. HTTP-статус находится в ответе Axios. */
export interface ValidationErrors {
	[field: string]: string[];
}

export interface LaravelErrorResponse {
	message: string;
	errors?: ValidationErrors;
}

type ApiError = {
	message?: string;
	status?: number;
	errors?: ValidationErrors;
	response?: { status?: number; data?: unknown };
	isAxiosError?: boolean;
};

function asRecord(value: unknown): Record<string, unknown> | undefined {
	return typeof value === 'object' && value !== null
		? (value as Record<string, unknown>)
		: undefined;
}

function getStatus(error: unknown): number | undefined {
	const value = asRecord(error);
	const response = asRecord(value?.response);
	const status = response?.status ?? value?.status;
	return typeof status === 'number' ? status : undefined;
}

function getPayload(error: unknown): Record<string, unknown> | undefined {
	const value = asRecord(error);
	const response = asRecord(value?.response);
	return asRecord(response?.data) ?? value;
}

export function isApiError(error: unknown): error is ApiError {
	return (
		getStatus(error) !== undefined ||
		typeof getPayload(error)?.message === 'string'
	);
}

export function isValidationError(error: unknown): boolean {
	return (
		getStatus(error) === 422 ||
		(getStatus(error) === undefined && !!getPayload(error)?.errors)
	);
}

export function isAuthError(error: unknown): boolean {
	return getStatus(error) === 401;
}

export function isForbiddenError(error: unknown): boolean {
	return getStatus(error) === 403;
}

export function isServerError(error: unknown): boolean {
	return (getStatus(error) ?? 0) >= 500;
}

export function getValidationErrors(error: unknown): ValidationErrors | null {
	if (!isValidationError(error)) return null;
	const errors = asRecord(getPayload(error)?.errors);
	if (!errors) return null;
	const entries = Object.entries(errors).filter(
		(entry): entry is [string, string[]] =>
			Array.isArray(entry[1]) &&
			entry[1].every((item: unknown) => typeof item === 'string'),
	);
	return Object.fromEntries(entries);
}

export function getFirstValidationError(
	error: unknown,
	field: string,
): string | undefined {
	return getValidationErrors(error)?.[field]?.[0];
}

export function getAllValidationMessages(error: unknown): string[] {
	return Object.values(getValidationErrors(error) ?? {}).flat();
}

export function getErrorMessage(error: unknown): string {
	const value = asRecord(error);
	const status = getStatus(error);
	if (value?.isAxiosError && status === undefined) {
		return 'Не удалось связаться с сервером. Проверьте подключение к интернету';
	}
	if (status !== undefined && status >= 500) {
		return 'На сервере произошла ошибка. Попробуйте позже';
	}
	const message = getPayload(error)?.message;
	if (typeof message === 'string' && message.trim()) return message;
	return 'Произошла непредвиденная ошибка. Попробуйте чуть позже';
}

export function getFriendlyErrorMessage(error: unknown): string {
	return getErrorMessage(error);
}

export function hasValidationError(error: unknown, field: string): boolean {
	return Object.hasOwn(getValidationErrors(error) ?? {}, field);
}
