import { useAuthStore } from '@/app/stores/useAuthStore';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { userKeys } from './user.keys';

export function useUserQuery() {
	const { isAuthenticated } = storeToRefs(useAuthStore());

	return useQuery({
		...userKeys.current(),
		enabled: isAuthenticated, // Запрос только если аутентифицирован
		staleTime: 60_000 * 5, // 5 минут
		retry: false,
	});
}
