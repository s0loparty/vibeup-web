import { getErrorMessage } from '@/app/client/api-errors';
import {
	authLogin,
	type AuthLoginData,
	type AuthToken,
	type User,
} from '@/shared/api';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import router from '../../router';
import { useAuthStore } from '../../stores/useAuthStore';
import { authKeys } from './auth.keys';

export function useLoginMutation() {
	const authStore = useAuthStore();

	return useMutation({
		mutationKey: authKeys.login().queryKey,

		mutationFn: async (credential: AuthLoginData['body']) => {
			const result = await authLogin({ body: credential });

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		onSuccess(data: { user?: User; token?: AuthToken }) {
			if (!!data.token?.token) {
				authStore.setToken(data.token.token);
			}

			if (!!data.user) {
				authStore.setUser(data.user!);
			}

			router.push({ name: 'chat-hello' });
		},

		onError(error) {
			toast.error(getErrorMessage(error));
			console.log(`Error: ${error}`);
		},
	});
}
