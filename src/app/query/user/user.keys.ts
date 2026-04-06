import { Service } from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const userKeys = createQueryKeys('user', {
	current: () => ({
		queryKey: ['currentUser'],
		queryFn: () => Service.userShow(),
	}),
});
