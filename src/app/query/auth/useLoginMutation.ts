import { getErrorMessage } from '@/app/client/api-errors';
import { type AuthCredential } from '@/app/types/auth';
import { Service, type AuthToken, type User } from '@/shared/api';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
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
			toast.error(getErrorMessage(error));
			console.log(`Error: ${error}`);
		},
	});
}
