import { type NamedRouteRecordRaw } from 'vue-routes-to-types';
import ChatWindow from '../chat/ChatWindow.vue';
import ChatWindowHello from '../chat/ChatWindowHello.vue';

export default [
	{
		path: '/',
		name: 'main',
		meta: { auth: true },
		redirect: { name: 'chat-hello' },
		children: [
			{
				path: '',
				component: ChatWindowHello,
				name: 'chat-hello',
				meta: { level: 1 },
			},
			{
				path: 'chat',
				name: 'chat-noid',
				redirect: { name: 'main' },
			},
			{
				path: 'chat/:id',
				component: ChatWindow,
				name: 'chat-window',
				meta: { level: 1 },
			},
		],
	},
] as const satisfies NamedRouteRecordRaw[];
