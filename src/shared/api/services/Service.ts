/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import type { AuthToken } from '../models/AuthToken';
import type { Chat } from '../models/Chat';
import type { CursorPaginationMeta } from '../models/CursorPaginationMeta';
import type { Message } from '../models/Message';
import type { User } from '../models/User';
export class Service {
	/**
	 * Регистрация нового пользователя
	 * Создаёт нового пользователя и возвращает токен доступа
	 * @param requestBody
	 * @returns any Успешная регистрация
	 * @throws ApiError
	 */
	public static authRegister(requestBody: {
		email: string;
		password: string;
	}): CancelablePromise<{
		user?: User;
		token?: AuthToken;
	}> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/auth/register',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				422: `Ошибка валидации`,
			},
		});
	}
	/**
	 * Вход
	 * Аутентификация пользователя и получение токена доступа
	 * @param requestBody
	 * @returns any Успешный вход
	 * @throws ApiError
	 */
	public static authLogin(requestBody: {
		email: string;
		password: string;
	}): CancelablePromise<{
		user?: User;
		token?: AuthToken;
	}> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/auth/login',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				401: `Неверные учётные данные`,
				422: `Ошибка валидации`,
			},
		});
	}
	/**
	 * Выход
	 * Уничтожает текущий токен доступа (выход из системы)
	 * @returns any Успешный выход
	 * @throws ApiError
	 */
	public static authLogout(): CancelablePromise<{
		message?: string;
	}> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/auth/logout',
			errors: {
				401: `Пользователь не аутентифицирован`,
			},
		});
	}
	/**
	 * Список чатов пользователя
	 * Возвращает список чатов пользователя с курсорной пагинацией
	 * @param filterType Фильтр по типу чата
	 * @param include Включить связанные данные (members, lastMessage, creator)
	 * @param sort Сортировка: id, created_at, updated_at (префикс - для убывания)
	 * @returns any Список чатов с курсорной пагинацией
	 * @throws ApiError
	 */
	public static chatsIndex(
		filterType?: 'private' | 'group',
		include?: string,
		sort?: string,
	): CancelablePromise<{
		data?: Array<Chat>;
		meta?: CursorPaginationMeta;
	}> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/chats',
			query: {
				'filter[type]': filterType,
				include: include,
				sort: sort,
			},
			errors: {
				401: `Пользователь не аутентифицирован`,
			},
		});
	}
	/**
	 * Создать чат
	 * Создаёт новый чат. Для private чата нужно передать participant_id
	 * @param requestBody
	 * @returns any Чат уже существует (для private чатов)
	 * @throws ApiError
	 */
	public static chatsStore(requestBody: {
		/**
		 * Тип чата
		 */
		type: 'private' | 'group';
		/**
		 * Название чата (обязательно для group)
		 */
		title?: string | null;
		/**
		 * ID участника для private чата
		 */
		participant_id?: number | null;
	}): CancelablePromise<{
		message?: string;
		chat?: Chat;
	}> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/chats',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Ошибка валидации`,
				404: `Пользователь не найден`,
			},
		});
	}
	/**
	 * Получить информацию о чате
	 * Возвращает данные чата по ID
	 * @param chat ID чата
	 * @param include Включить связанные данные (members, lastMessage, creator)
	 * @returns any Данные чата
	 * @throws ApiError
	 */
	public static chatsShow(
		chat: number,
		include?: string,
	): CancelablePromise<{
		chat?: Chat;
	}> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/chats/{chat}',
			path: {
				chat: chat,
			},
			query: {
				include: include,
			},
			errors: {
				403: `Нет доступа к чату`,
				404: `Чат не найден`,
			},
		});
	}
	/**
	 * Обновить чат
	 * Обновляет название чата. Только для group чатов
	 * @param chat ID чата
	 * @param requestBody
	 * @returns any Чат обновлён
	 * @throws ApiError
	 */
	public static chatsUpdate(
		chat: number,
		requestBody?: {
			/**
			 * Новое название чата
			 */
			title?: string;
		},
	): CancelablePromise<{
		message?: string;
		chat?: Chat;
	}> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/chats/{chat}',
			path: {
				chat: chat,
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				400: `Нельзя изменить title у private чата`,
				403: `Только владелец или модератор может редактировать`,
			},
		});
	}
	/**
	 * Удалить чат
	 * Удаляет чат. Только владелец может удалить
	 * @param chat ID чата
	 * @returns any Чат удалён
	 * @throws ApiError
	 */
	public static chatsDestroy(chat: number): CancelablePromise<{
		status?: string;
		message?: string;
	}> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/chats/{chat}',
			path: {
				chat: chat,
			},
			errors: {
				403: `Только владелец может удалить чат`,
			},
		});
	}
	/**
	 * Получить текущего пользователя
	 * Возвращает данные текущего аутентифицированного пользователя
	 * @returns User Данные получены
	 * @throws ApiError
	 */
	public static userShow(): CancelablePromise<User> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/user',
			errors: {
				401: `Пользователь не аутентифицирован`,
			},
		});
	}
	/**
	 * Обновить текущего пользователя
	 * Обновляет данные текущего аутентифицированного пользователя
	 * @param requestBody
	 * @returns User Данные обновлены
	 * @throws ApiError
	 */
	public static userUpdate(requestBody?: {
		/**
		 * Имя пользователя
		 */
		name?: string;
		/**
		 * Email адрес
		 */
		email?: string;
		/**
		 * Новый пароль (мин. 8 символов)
		 */
		password?: string;
	}): CancelablePromise<User> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/user',
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				401: `Пользователь не аутентифицирован`,
				422: `Ошибка валидации`,
			},
		});
	}
	/**
	 * Удалить текущего пользователя
	 * Безвозвратно удаляет аккаунт текущего пользователя
	 * @returns any Аккаунт удалён
	 * @throws ApiError
	 */
	public static userDestroy(): CancelablePromise<{
		message?: string;
	}> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/user',
			errors: {
				401: `Пользователь не аутентифицирован`,
			},
		});
	}
	/**
	 * Список сообщений чата
	 * Возвращает список сообщений чата с курсорной пагинацией
	 * @param chatId ID чата
	 * @param filterType Фильтр по типу сообщения
	 * @param filterSenderId Фильтр по ID отправителя
	 * @param filterBefore Сообщения до указанного ID (для пагинации)
	 * @param filterAfter Сообщения после указанного ID (для пагинации)
	 * @param include Включить связанные данные (sender, replyTo, chat)
	 * @param sort Сортировка: id, created_at, updated_at (префикс - для убывания)
	 * @returns any Список сообщений с курсорной пагинацией
	 * @throws ApiError
	 */
	public static messagesIndex(
		chatId: number,
		filterType?: 'text' | 'image' | 'video' | 'audio' | 'file',
		filterSenderId?: number,
		filterBefore?: number,
		filterAfter?: number,
		include?: string,
		sort?: string,
	): CancelablePromise<{
		data?: Array<Message>;
		meta?: CursorPaginationMeta;
	}> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/chats/{chatId}/messages',
			path: {
				chatId: chatId,
			},
			query: {
				'filter[type]': filterType,
				'filter[sender_id]': filterSenderId,
				'filter[before]': filterBefore,
				'filter[after]': filterAfter,
				include: include,
				sort: sort,
			},
			errors: {
				401: `Пользователь не аутентифицирован`,
				403: `Нет доступа к чату`,
			},
		});
	}
	/**
	 * Создать сообщение
	 * Отправляет новое сообщение в чат
	 * @param chatId ID чата
	 * @param requestBody
	 * @returns Message Сообщение создано
	 * @throws ApiError
	 */
	public static messagesStore(
		chatId: number,
		requestBody: {
			/**
			 * Тип сообщения
			 */
			type: 'text' | 'image' | 'video' | 'audio' | 'file';
			/**
			 * Текст сообщения или описание медиа
			 */
			body: string;
			/**
			 * ID сообщения, на которое отвечаем
			 */
			reply_to_id?: number | null;
		},
	): CancelablePromise<Message> {
		return __request(OpenAPI, {
			method: 'POST',
			url: '/api/v1/chats/{chatId}/messages',
			path: {
				chatId: chatId,
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `Пользователь не является участником чата`,
				422: `Ошибка валидации`,
			},
		});
	}
	/**
	 * Показать сообщение
	 * Возвращает одно сообщение по ID
	 * @param chatId ID чата
	 * @param message ID сообщения
	 * @returns Message Сообщение найдено
	 * @throws ApiError
	 */
	public static messagesShow(
		chatId: number,
		message: number,
	): CancelablePromise<Message> {
		return __request(OpenAPI, {
			method: 'GET',
			url: '/api/v1/chats/{chatId}/messages/{message}',
			path: {
				chatId: chatId,
				message: message,
			},
			errors: {
				403: `Пользователь не является участником чата`,
				404: `Сообщение не найдено`,
			},
		});
	}
	/**
	 * Редактировать сообщение
	 * Обновляет текст сообщения. Только автор может редактировать
	 * @param chatId ID чата
	 * @param message ID сообщения
	 * @param requestBody
	 * @returns Message Сообщение обновлено
	 * @throws ApiError
	 */
	public static messagesUpdate(
		chatId: number,
		message: number,
		requestBody?: {
			/**
			 * Новый текст сообщения
			 */
			body?: string;
		},
	): CancelablePromise<Message> {
		return __request(OpenAPI, {
			method: 'PUT',
			url: '/api/v1/chats/{chatId}/messages/{message}',
			path: {
				chatId: chatId,
				message: message,
			},
			body: requestBody,
			mediaType: 'application/json',
			errors: {
				403: `Только автор может редактировать`,
			},
		});
	}
	/**
	 * Удалить сообщение
	 * Удаляет сообщение. Только автор или модератор/владелец
	 * @param chatId ID чата
	 * @param message ID сообщения
	 * @returns any Сообщение удалено
	 * @throws ApiError
	 */
	public static messagesDestroy(
		chatId: number,
		message: number,
	): CancelablePromise<{
		status?: string;
		message?: string;
	}> {
		return __request(OpenAPI, {
			method: 'DELETE',
			url: '/api/v1/chats/{chatId}/messages/{message}',
			path: {
				chatId: chatId,
				message: message,
			},
			errors: {
				403: `Нет прав на удаление`,
			},
		});
	}
}
