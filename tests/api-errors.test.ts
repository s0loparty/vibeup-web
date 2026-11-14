import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
	getErrorMessage,
	getValidationErrors,
	isAuthError,
	isValidationError,
} from '../src/app/client/api-errors.ts';

test('reads Laravel validation errors and HTTP status from Axios response', () => {
	const error = {
		response: {
			status: 422,
			data: {
				message: 'Ошибка проверки',
				errors: { email: ['Неверный email'] },
			},
		},
		message: 'Request failed with status code 422',
	};
	assert.equal(isValidationError(error), true);
	assert.deepEqual(getValidationErrors(error), { email: ['Неверный email'] });
	assert.equal(getErrorMessage(error), 'Ошибка проверки');
});

test('handles authorization and network errors without exposing technical messages', () => {
	assert.equal(
		isAuthError({
			response: { status: 401, data: { message: 'Unauthenticated.' } },
		}),
		true,
	);
	assert.equal(
		getErrorMessage({ message: 'Network Error', isAxiosError: true }),
		'Не удалось связаться с сервером. Проверьте подключение к интернету',
	);
});
