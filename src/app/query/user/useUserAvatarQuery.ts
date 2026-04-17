import { useAuthStore } from '@/app/stores/useAuthStore';
import { usersAvatarsShow } from '@/shared/api';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';
import { userKeys } from './user.keys';

export function useUserAvatarQuery() {
	const authStore = useAuthStore();

	const enabled = computed(() => !!authStore.user?.id);

	return useQuery({
		queryKey: userKeys.avatar().queryKey,

		queryFn: async () => {
			const result = await usersAvatarsShow({
				path: { user: authStore.user?.id! },
			});

			if (result.error) {
				throw result.error;
			}

			return result.data;
		},

		staleTime: Infinity,

		enabled,
	});
}
