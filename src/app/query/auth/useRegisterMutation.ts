import { getErrorMessage } from '@/app/client/api-errors';
import { Service, type AuthToken, type User } from '@/shared/api';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import router from '../../router';
import { useAuthStore } from '../../stores/useAuthStore';
import type { AuthCredential } from '../../types/auth';
import { authKeys } from './auth.keys';

export function useRegisterMutation() {
	const authStore = useAuthStore();

	return useMutation({
		mutationKey: authKeys.register().queryKey,

		mutationFn: (credential: AuthCredential) => {
			return Service.authRegister(credential);
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
