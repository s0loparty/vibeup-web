import router from '@/app/router';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { OpenAPI } from '@/shared/api/core/OpenAPI';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/auth';

/**
 * Конфигурация API-клиента
 *
 * - Request interceptor: добавляет Bearer токен из localStorage
 * - Response interceptor: ловит 401 и редиректит на логин
 */

// Configure OpenAPI base URL
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost';
OpenAPI.VERSION = '1.0.0';
OpenAPI.TOKEN = undefined;

// Flag чтобы избежать множественных редиректов при нескольких параллельных запросах
let isRedirecting = false;

// Request interceptor — добавляем токен
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(AUTH_TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor — обрабатываем 401
axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Игнорируем 401 от logout — там своя логика
			const requestUrl = error.config?.url || '';
			if (requestUrl.includes('/auth/logout')) {
				return Promise.reject(error);
			}

			if (!isRedirecting) {
				isRedirecting = true;

				// Очищаем состояние аутентификации
				const authStore = useAuthStore();
				authStore.reset();

				// Редирект на логин
				router.push({ name: 'auth:login' }).finally(() => {
					// Сбрасываем флаг после редиректа
					setTimeout(() => {
						isRedirecting = false;
					}, 1000);
				});
			}
		}

		return Promise.reject(error);
	},
);

export { axios, OpenAPI };
