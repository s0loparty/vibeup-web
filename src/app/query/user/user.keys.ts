import type { User } from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const userKeys = createQueryKeys('user', {
	user: (userId: User['id']) => [userId],
});
