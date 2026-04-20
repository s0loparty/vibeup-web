import { useUpdateUserAvatarMutation } from '@/app/query/user/useUpdateUserAvatarMutation';
import { useUpdateUserMutation } from '@/app/query/user/useUpdateUserMutation';
import { useUserAvatarQuery } from '@/app/query/user/useUserAvatarQuery';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { useFileDialog, watchDebounced } from '@vueuse/core';
import { reactive, watch } from 'vue';

export function useUserEditProfile() {
	const authStore = useAuthStore();

	const { open, onChange, reset } = useFileDialog({
		accept: 'image/*',
		multiple: false,
	});

	const { data: userAvatar, isFetching: waitUserAvatar } = useUserAvatarQuery();
	const { mutate: updateAvatar, isPending: isAvatarUpdate } =
		useUpdateUserAvatarMutation();

	const { mutate: updateUser } = useUpdateUserMutation();

	onChange((files) => {
		if (files && files.length > 0) {
			const file = files[0];
			if (!file) return;
			updateAvatar(file);
			reset();
		}
	});

	const form = reactive({
		username: '',
		bio: '',
	});

	watchDebounced(
		() => [form.username, form.bio],
		([newUserName, newBio]) => {
			const user = authStore.user;
			if (!user) return;

			if (user.username !== newUserName || user.bio !== newBio) {
				updateUser(
					{
						username: newUserName,
						bio: newBio,
					},
					{
						onError: () => {
							const currentUser = authStore.user;

							if (!currentUser) return;

							form.username = currentUser?.username;
							form.bio = currentUser.bio ?? '';
						},
					},
				);
			}
		},
		{ debounce: 2000 },
	);

	watch(
		() => authStore.user,
		(newUser) => {
			if (!newUser) return;

			form.username = newUser.username || '';
			form.bio = newUser.bio || '';
		},

		{ immediate: true },
	);
	return { isAvatarUpdate, waitUserAvatar, userAvatar, form, open };
}
