import router from '@/app/router';
import { useAuthStore } from '@/app/stores/useAuthStore';
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
				//TODO:1 - ID USERA
				queryKey: userKeys.user(1).queryKey,
			});

			authStore.reset();

			router.push({ name: 'auth:login' });
		},

		onError(error) {
			console.error('Error logging out:', error);
		},
	});
}
