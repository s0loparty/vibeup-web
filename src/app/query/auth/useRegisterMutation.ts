import { getErrorMessage } from '@/app/client/api-errors';
import {
	authRegister,
	type AuthRegisterData,
	type AuthToken,
	type User,
} from '@/shared/api';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import router from '../../router';
import { useAuthStore } from '../../stores/useAuthStore';
import { authKeys } from './auth.keys';

export function useRegisterMutation() {
	const authStore = useAuthStore();

	return useMutation({
		mutationKey: authKeys.register().queryKey,

		mutationFn: async (credential: AuthRegisterData['body']) => {
			const result = await authRegister({ body: credential });

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
