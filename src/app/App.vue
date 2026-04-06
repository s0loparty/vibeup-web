<script setup lang="ts">
import { Toaster } from '@/app/components/ui/sonner';
import ChatUserinfo from '@/modules/chat/chat-userinfo/ChatUserinfo.vue';
import ChatWindow from '@/modules/chat/ChatWindow.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { watch } from 'vue';
import { useAppColor } from './composables/useAppColor';
import { userKeys } from './query/user/user.keys';
import { useUserQuery } from './query/user/useUserQuery';
import { useAuthStore } from './stores/useAuthStore';

const authStore = useAuthStore();
const queryClient = useQueryClient();

// Initialize app color
const appColor = useAppColor();
appColor.setHtmlColor();

// Загружаем данные пользователя когда аутентифицирован
const { data: user } = useUserQuery();

// Синхронизируем данные пользователя из Vue Query в Pinia
watch(user, (newUser) => {
	if (newUser) {
		authStore.setUser(newUser);
	}
});

// При логауте — инвалидируем кэш пользователя
watch(
	() => authStore.isAuthenticated,
	(isAuth) => {
		if (!isAuth) {
			queryClient.invalidateQueries({ queryKey: userKeys.current().queryKey });
			authStore.reset();
		}
	},
);
</script>

<template>
	<main
		v-if="authStore.isAuthenticated"
		class="app-container overflow-x-hidden"
		style="box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1)"
	>
		<div class="relative flex min-h-dvh justify-center">
			<RouterView />

			<ChatWindow />
			<ChatUserinfo />
		</div>
	</main>

	<div v-else class="flex items-center justify-center">
		<RouterView />
	</div>

	<Toaster
		:closeButton="true"
		closeButtonPosition="top-right"
		position="top-center"
	/>
	<VueQueryDevtools />
</template>
