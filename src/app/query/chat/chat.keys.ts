import { createQueryKeys } from '@lukemorales/query-key-factory';

export const chatKeys = createQueryKeys('chat', {
	list: () => ({
		queryKey: ['list'],
	}),
});
