import { getErrorMessage } from '@/app/client/api-errors';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { usersAvatarsDestroy } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { userKeys } from './user.keys';

export function useRemoveUserAvatarMutation() {
	const client = useQueryClient();
	const authStore = useAuthStore();

	return useMutation({
		mutationKey: userKeys.avatar().queryKey,

		mutationFn: async () => {
			const result = await usersAvatarsDestroy({
				path: { user: authStore.user?.id! },
			});

			if (result.error) {
				throw result.error;
			}

			return result;
		},

		onMutate: async () => {
			await client.cancelQueries({ queryKey: userKeys.avatar().queryKey });

			const currentAvatar = client.getQueryData(userKeys.avatar().queryKey);

			return { currentAvatar };
		},

		onSuccess: () => {
			client.setQueriesData({ queryKey: userKeys.avatar().queryKey }, null);
		},

		onError: (error, _, context) => {
			toast.error(getErrorMessage(error));
			console.log(error);

			if (context) {
				client.setQueryData(userKeys.avatar().queryKey, context.currentAvatar);
			}
		},
	});
}
