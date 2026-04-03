import { OpenAPI } from '@/shared/api/core/OpenAPI';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/auth';

/**
 * Конфигурация API-клиента
 *
 * Этот файл настраивает перехватчик Axios, который автоматически внедряет
 * токен Bearer из localStorage в каждый запрос.
 *
 * Подход с использованием перехватчика гарантирует:
 * - Токен всегда актуален (считывается при каждом запросе)
 * - Отсутствие необходимости в ручной синхронизации между состоянием аутентификации и API-клиентом
 * - Корректную работу с процессами выхода/входа
 */

// Configure OpenAPI base URL
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost';
OpenAPI.VERSION = '1.0.0';

// Убедитесь, что TOKEN не определен, чтобы перехватчик обрабатывал аутентификацию.
// (Предотвращает дублирование заголовков авторизации)
OpenAPI.TOKEN = undefined;

// Добавьте перехватчик Axios для внедрения токена Bearer в каждый запрос.
axios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(AUTH_TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Экспорт настроенные OpenAPI и axios для использования в приложении.
export { axios, OpenAPI };
