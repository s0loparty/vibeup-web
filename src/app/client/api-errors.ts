/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiError } from '@/shared/api';

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
 * Типизированный API Error
 */
export type TypedApiError = ApiError & {
	body: LaravelErrorResponse;
};

/**
 * Проверка, что ошибка является ApiError с телом
 */
export function isApiError(error: unknown): error is TypedApiError {
	return (
		typeof error === 'object' &&
		error !== null &&
		'status' in error &&
		'body' in error &&
		typeof (error as any).body === 'object'
	);
}

/**
 * Проверка, что ошибка является ошибкой валидации (422)
 */
export function isValidationError(error: unknown): error is TypedApiError {
	return isApiError(error) && error.status === 422;
}

/**
 * Проверка, что ошибка является ошибкой авторизации (401)
 */
export function isAuthError(error: unknown): error is TypedApiError {
	return isApiError(error) && error.status === 401;
}

/**
 * Извлечение ошибок валидации из API ошибки
 * Возвращает Record<string, string[]> или null если это не ошибка валидации
 */
export function getValidationErrors(error: unknown): ValidationErrors | null {
	if (isValidationError(error) && error.body?.errors) {
		return error.body.errors;
	}
	return null;
}

/**
 * Извлечение сообщения об ошибке из API ответа
 */
export function getErrorMessage(error: unknown): string {
	if (isApiError(error) && error.body?.message) {
		return error.body.message;
	}
	return 'Unknown error';
}
