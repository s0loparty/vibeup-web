import { useAuthStore } from '@/app/stores/useAuthStore';
import { userShow } from '@/shared/api';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { userKeys } from './user.keys';

export function useUserQuery() {
	const { isAuthenticated } = storeToRefs(useAuthStore());

	return useQuery({
		...userKeys.current(),
		queryFn: () => userShow(),
		enabled: isAuthenticated, // Запрос только если аутентифицирован
		staleTime: Infinity,
		retry: false,
		select(data) {
			return data.data;
		},
	});
}
