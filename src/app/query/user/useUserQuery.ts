import { useAuthStore } from '@/app/stores/useAuthStore';
import { Service } from '@/shared/api';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { userKeys } from './user.keys';

export function useUserQuery() {
	const { isAuthenticated } = storeToRefs(useAuthStore());

	return useQuery({
		...userKeys.current(),
		queryFn: () => Service.userShow(),
		enabled: isAuthenticated, // Запрос только если аутентифицирован
		staleTime: Infinity,
		retry: false,
	});
}
