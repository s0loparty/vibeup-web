import router from '@/app/router';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { handleApiError } from '@/app/utils/error-handler';
import { Service } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { userKeys } from '../user/user.keys';
import { authKeys } from './auth.keys';

export function useLogoutMutation() {
	const authStore = useAuthStore();
	const client = useQueryClient();

	return useMutation({
		mutationKey: authKeys.logout().queryKey,

		mutationFn: async () => {
			return Service.authLogout();
		},

		onSuccess() {
			client.invalidateQueries({
				queryKey: userKeys.current().queryKey,
			});

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
			console.error('Error logging out:', error);
		},
	});
}
