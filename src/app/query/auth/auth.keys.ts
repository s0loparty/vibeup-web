import { createQueryKeys } from '@lukemorales/query-key-factory';

export const authKeys = createQueryKeys('auth', {
	login: () => ['login'],
	register: () => ['register'],
	logout: () => ['logout'],
});
