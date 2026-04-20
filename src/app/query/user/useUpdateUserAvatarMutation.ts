import { getErrorMessage } from '@/app/client/api-errors';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { usersAvatarsStore, type UsersAvatarsStoreData } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { userKeys } from './user.keys';
import { userMutationKeys } from './userMutation.keys';

export function useUpdateUserAvatarMutation() {
	const clinet = useQueryClient();
	const authStore = useAuthStore();

	return useMutation({
		mutationKey: userMutationKeys.updateAvatar().queryKey,

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

		onMutate: async () => {
			await clinet.cancelQueries({ queryKey: userKeys.avatar().queryKey });

			const prevAvatarData = clinet.getQueryData(userKeys.avatar().queryKey);

			return { prevAvatarData };
		},

		onSuccess: (newAvatar) => {
			clinet.setQueryData(userKeys.avatar().queryKey, newAvatar);
		},

		onError: (error, newAvatar, context) => {
			toast.error(getErrorMessage(error));
			console.log(error);

			if (context) {
				clinet.setQueryData(userKeys.avatar().queryKey, context.prevAvatarData);
			}
		},
	});
}
