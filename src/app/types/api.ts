import type { Chat, Message, User } from '@/shared/api';

export type ChatWithLastMessage = Chat & {
	last_message: Message;
	members: User[];
};
