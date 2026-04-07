/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Структура ошибки валидации Laravel
 */
export interface ValidationErrors {
	[field: string]: string[];
}

/**
 * Структура ответа об ошибке от Laravel API
 */
export interface LaravelErrorResponse {
	message: string;
	errors?: ValidationErrors;
}

/**
 * Тип ошибки API от @hey-api/openapi-ts
 * Обычно имеет структуру:
 * {
 *   status: number;
 *   payload?: unknown;
 *   message?: string;
 * }
 */
export interface HeyApiError extends Error {
	status: number;
	payload?: LaravelErrorResponse;
	message: string;
}

/**
 * Проверка, что ошибка является API ошибкой
 */
export function isApiError(error: unknown): error is HeyApiError {
	return (
		typeof error === 'object' &&
		error !== null &&
		'status' in error &&
		typeof (error as any).status === 'number' &&
		'message' in error
	);
}

/**
 * Проверка, что ошибка является ошибкой валидации (422)
 */
export function isValidationError(error: unknown): error is HeyApiError {
	return isApiError(error) && error.status === 422;
}

/**
 * Проверка, что ошибка является ошибкой авторизации (401)
 */
export function isAuthError(error: unknown): error is HeyApiError {
	return isApiError(error) && error.status === 401;
}

/**
 * Проверка, что ошибка является ошибкой доступа (403)
 */
export function isForbiddenError(error: unknown): error is HeyApiError {
	return isApiError(error) && error.status === 403;
}

/**
 * Проверка, что ошибка является ошибкой сервера (500)
 */
export function isServerError(error: unknown): error is HeyApiError {
	return isApiError(error) && error.status >= 500;
}

/**
 * Извлечение ошибок валидации из API ошибки
 * Возвращает Record<string, string[]> или null если это не ошибка валидации
 */
export function getValidationErrors(error: unknown): ValidationErrors | null {
	if (isValidationError(error) && error.payload?.errors) {
		return error.payload.errors;
	}
	return null;
}

/**
 * Получение первого сообщения об ошибке валидации для конкретного поля
 */
export function getFirstValidationError(
	error: unknown,
	field: string,
): string | undefined {
	const errors = getValidationErrors(error);
	if (errors && errors[field] && errors[field].length > 0) {
		return errors[field][0];
	}
	return undefined;
}

/**
 * Получение всех сообщений об ошибках валидации в виде плоского массива
 */
export function getAllValidationMessages(error: unknown): string[] {
	const errors = getValidationErrors(error);
	if (!errors) return [];

	return Object.values(errors).flat();
}

/**
 * Извлечение сообщения об ошибке из API ответа
 */
export function getErrorMessage(error: unknown): string {
	if (isApiError(error)) {
		// Сначала проверяем payload
		if (error.payload?.message) {
			return error.payload.message;
		}
		// Затем стандартное сообщение ошибки
		if (error.message) {
			return error.message;
		}
	}

	if (error instanceof Error) {
		return error.message;
	}

	return 'Unknown error';
}

/**
 * Получение понятного пользователю сообщения об ошибке
 */
export function getFriendlyErrorMessage(error: unknown): string {
	if (!isApiError(error)) {
		return 'Произошла непредвиденная ошибка. Попробуйте чуть позже';
	}

	switch (error.status) {
		case 400:
			return 'Некорректный запрос. Проверьте введенные данные';
		case 401:
			return 'Сессия истекла, пожалуйста, авторизуйтесь еще раз';
		case 403:
			return 'У вас недостаточно прав на выполнение данной операции';
		case 404:
			return 'Запрашиваемые данные не найдены';
		case 409:
			return 'Такой пользователь или данные уже существуют';
		case 422:
			return 'Пожалуйста, исправьте ошибки в форме';
		case 429:
			return 'Слишком много запросов. Пожалуйста, подождите';
		case 500:
			return 'На сервере что-то сломалась. Мы уже чиним!';
		case 502:
		case 503:
		case 504:
			return 'Сервер временно недоступен. Попробуйте позже';
		default:
			if (error.status >= 500) {
				return 'На сервере произошла ошибка. Попробуйте позже';
			}
			return (
				getErrorMessage(error) ||
				'Произошла непредвиденная ошибка. Попробуйте чуть позже'
			);
	}
}

/**
 * Проверка, есть ли в ошибке валидационные ошибки для конкретного поля
 */
export function hasValidationError(error: unknown, field: string): boolean {
	const errors = getValidationErrors(error);
	return !!errors && field in errors;
}

/**
 * Преобразование ошибки в логгируемый объект
 */
export function toLoggableError(error: unknown): Record<string, any> {
	if (isApiError(error)) {
		return {
			status: error.status,
			message: error.message,
			payload: error.payload,
			stack: error.stack,
		};
	}

	if (error instanceof Error) {
		return {
			message: error.message,
			stack: error.stack,
			name: error.name,
		};
	}

	return { error: String(error) };
}
