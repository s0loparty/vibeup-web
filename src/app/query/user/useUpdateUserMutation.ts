import { getErrorMessage } from '@/app/client/api-errors';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { userUpdate, type UserUpdateData } from '@/shared/api';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

export function useUpdateUserMutation() {
	const authStore = useAuthStore();

	return useMutation({
		mutationFn: async (newUserInfo: UserUpdateData['body']) => {
			const result = await userUpdate({ body: newUserInfo });

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		onSuccess: (newUserInfo) => {
			authStore.user = newUserInfo;
			toast.success('Данные успешно обновлены');
		},

		onError: (error) => {
			toast.error(getErrorMessage(error));
			console.log(error);
		},
	});
}
