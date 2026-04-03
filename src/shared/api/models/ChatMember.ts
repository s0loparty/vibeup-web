/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
/**
 * Участник чата
 */
export type ChatMember = {
	user_id: number;
	chat_id: number;
	role: ChatMember.role;
	last_read_message_id?: number | null;
	created_at?: string;
	updated_at?: string;
	user?: User | null;
};
export namespace ChatMember {
	export enum role {
		OWNER = 'owner',
		MODERATOR = 'moderator',
		MEMBER = 'member',
	}
}
