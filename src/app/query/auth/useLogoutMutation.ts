import { getErrorMessage } from '@/app/client/api-errors';
import router from '@/app/router';
import { useAuthStore } from '@/app/stores/useAuthStore';
import type { QueryMeta } from '@/app/types/query-meta';
import { handleApiError } from '@/app/utils/error-handler';
import { authLogout } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { authKeys } from './auth.keys';

export function useLogoutMutation() {
	const authStore = useAuthStore();

	const client = useQueryClient();

	return useMutation({
		mutationKey: authKeys.logout().queryKey,

		meta: {
			loader: 'global',
		} satisfies QueryMeta,

		mutationFn: async () => {
			return authLogout();
		},

		onSuccess() {
			client.clear();
			authStore.reset();

			router.push({ name: 'auth:login' });
		},

		onError(err) {
			const error = handleApiError(err);

			// Если токен уже протух (401), всё равно редиректим на логин
			if (error.status === 401) {
				authStore.reset();
				router.push({ name: 'auth:login' });
				return;
			}

			toast.error(getErrorMessage(error));
			console.error('Error logging out:', error);
		},
	});
}
