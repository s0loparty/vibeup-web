import { getErrorMessage, isAuthError } from '@/app/client/api-errors';
import router from '@/app/router';
import { useAuthStore } from '@/app/stores/useAuthStore';
import type { QueryMeta } from '@/app/types/query-meta';
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
			const result = await authLogout();
			if (result.error) throw result;
			return result.data;
		},

		onSuccess() {
			client.clear();
			authStore.reset();

			router.push({ name: 'auth:login' });
		},

		onError(err) {
			// Если токен уже протух (401), всё равно редиректим на логин
			if (isAuthError(err)) {
				authStore.reset();
				router.push({ name: 'auth:login' });
				return;
			}

			toast.error(getErrorMessage(err));
			console.error('Error logging out:', err);
		},
	});
}
