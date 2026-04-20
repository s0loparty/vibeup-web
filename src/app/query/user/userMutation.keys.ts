import { createQueryKeys } from '@lukemorales/query-key-factory';

export const userMutationKeys = createQueryKeys('user', {
	updateUser: () => ({
		queryKey: ['updateUser'],
	}),

	updateAvatar: () => ['updateAvatar'],
});
