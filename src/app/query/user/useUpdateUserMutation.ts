import { getErrorMessage } from '@/app/client/api-errors';
import { userUpdate, type UserUpdateData } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { userKeys } from './user.keys';

export function useUpdateUserMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newUserInfo: UserUpdateData['body']) => {
			const result = await userUpdate({ body: newUserInfo });

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: userKeys.current().queryKey,
			});
		},

		onError: (error) => {
			toast.error(getErrorMessage(error));
			console.log(error);
		},
	});
}
