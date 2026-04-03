/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
/**
 * Сообщение в чате
 */
export type Message = {
	id: number;
	chat_id: number;
	sender_id: number;
	type: Message.type;
	body: string;
	reply_to_id?: number | null;
	edited_at?: string | null;
	created_at?: string;
	updated_at?: string;
	sender?: User | null;
	reply_to?: Message | null;
};
export namespace Message {
	export enum type {
		TEXT = 'text',
		IMAGE = 'image',
		VIDEO = 'video',
		AUDIO = 'audio',
		FILE = 'file',
	}
}
