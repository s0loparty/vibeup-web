import { getErrorMessage } from '@/app/client/api-errors';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { userUpdate, type User, type UserUpdateData } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { userKeys } from './user.keys';

export function useUpdateUserMutation() {
	const client = useQueryClient();
	const authStore = useAuthStore();

	return useMutation({
		mutationKey: userKeys.current().queryKey,

		mutationFn: async (newUserInfo: UserUpdateData['body']) => {
			const result = await userUpdate({ body: newUserInfo });

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		onMutate: async () => {
			const prevUserData = client.getQueryData<User>(
				userKeys.current().queryKey,
			);

			return { prevUserData };
		},

		onSuccess: (newUserInfo) => {
			client.setQueryData(userKeys.current().queryKey, newUserInfo);
			authStore.setUser(newUserInfo);
		},

		onError: (error, _, context) => {
			toast.error(getErrorMessage(error));
			console.log(error);

			if (context?.prevUserData) {
				client.setQueryData(userKeys.current().queryKey, context.prevUserData);
				authStore.setUser(context.prevUserData);
			}
		},
	});
}
