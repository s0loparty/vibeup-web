import { getErrorMessage } from '@/app/client/api-errors';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { usersAvatarsStore, type UsersAvatarsStoreData } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { userKeys } from './user.keys';

export function useUpdateUserAvatarMutation() {
	const clinet = useQueryClient();
	const authStore = useAuthStore();

	return useMutation({
		mutationKey: userKeys.avatar().queryKey,

		mutationFn: async (file: UsersAvatarsStoreData['body']['avatar']) => {
			const result = await usersAvatarsStore({
				body: { avatar: file },
				path: { user: authStore.user?.id! },
			});

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		onSuccess: (newAvatar) => {
			clinet.setQueryData(userKeys.avatar().queryKey, newAvatar);
		},

		onError: (error) => {
			toast.error(getErrorMessage(error));
			console.log(error);
		},
	});
}
