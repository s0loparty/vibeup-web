import { getErrorMessage } from '@/app/client/api-errors';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { userUpdate, type UserUpdateData } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { userKeys } from './user.keys';
import { userMutationKeys } from './userMutation.keys';

export function useUpdateUserMutation() {
	const client = useQueryClient();
	const authStore = useAuthStore();

	return useMutation({
		mutationKey: userMutationKeys.updateUser().queryKey,

		mutationFn: async (newUserInfo: UserUpdateData['body']) => {
			const result = await userUpdate({ body: newUserInfo });

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		onSuccess: (newUserInfo) => {
			client.setQueryData(userKeys.current().queryKey, newUserInfo);
			authStore.setUser(newUserInfo);
		},

		onError: (error) => {
			toast.error(getErrorMessage(error));
			console.log(error);
		},
	});
}
