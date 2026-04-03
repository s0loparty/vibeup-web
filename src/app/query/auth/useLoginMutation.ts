import { type AuthCredential } from '@/app/types/auth';
import { Service, type AuthToken, type User } from '@/shared/api';
import { useMutation } from '@tanstack/vue-query';
import router from '../../router';
import { useAuthStore } from '../../stores/useAuthStore';
import { authKeys } from './auth.keys';

export function useLoginMutation() {
	const authStore = useAuthStore();

	return useMutation({
		mutationKey: authKeys.login().queryKey,

		mutationFn: (credential: AuthCredential) => {
			return Service.authLogin(credential);
		},

		onSuccess(data: { user?: User; token?: AuthToken }) {
			if (!!data.token?.token) {
				authStore.setToken(data.token.token);
			}

			if (!!data.user) {
				authStore.setUser(data.user!);
			}

			router.push({ name: 'chatlist' });
		},

		onError(error) {
			//TODOS: прикрутить TOAST NOTIFICATION
			console.log(`Error: ${error}`);
		},
	});
}
