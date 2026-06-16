<script setup lang="ts">
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/app/components/ui/resizable';
import { Toaster } from '@/app/components/ui/sonner';
import ChatUserinfo from '@/modules/chat/chat-userinfo/ChatUserinfo.vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import type { SplitterPanel } from 'reka-ui';
import { computed, ref, watch } from 'vue';
import AppLoader from './components/AppLoader.vue';
import { useAppColor } from './composables/useAppColor';
import AsideLayout from './layouts/AsideLayout.vue';
import { useUserAvatarQuery } from './query/user/useUserAvatarQuery';
import { useUserQuery } from './query/user/useUserQuery';
import { useAppMenuStore } from './stores/useAppMenuStore.ts';
import { useAuthStore } from './stores/useAuthStore';

const authStore = useAuthStore();
const { showAside } = storeToRefs(useAppMenuStore());

const breakpoints = useBreakpoints(breakpointsTailwind);
const lgAndSmaller = breakpoints.smaller('lg');
const shouldShowAside = computed(() => {
	if (!lgAndSmaller.value) return true;
	return showAside.value;
});
const asidePanelRef = ref<InstanceType<typeof SplitterPanel> | null>(null);
watch(shouldShowAside, (isShow) => {
	if (!asidePanelRef.value) return;

	if (isShow) {
		asidePanelRef.value.expand();
	} else {
		asidePanelRef.value.collapse();
	}
});

// Initialize app color
const appColor = useAppColor();
appColor.setHtmlColor();

// Загружаем данные пользователя когда аутентифицирован
const { data: user } = useUserQuery();
const { data: avatar } = useUserAvatarQuery();

// Синхронизируем данные пользователя из Vue Query в Pinia
watch(
	user,
	(newUser) => {
		if (newUser && authStore.isAuthenticated) {
			authStore.setUser(newUser);
		}
	},
	{ once: true },
);

watch(
	avatar,
	(newAvatar) => {
		return newAvatar;
	},
	{ once: true },
);
</script>

<template>
	<main
		v-if="authStore.isAuthenticated"
		class="app-container overflow-x-hidden"
		style="box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1)"
	>
		<div class="relative flex min-h-dvh justify-center">
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel
					ref="asidePanelRef"
					sizeUnit="px"
					:maxSize="lgAndSmaller ? 0 : 420"
					:minSize="lgAndSmaller ? 0 : 300"
				>
					<AsideLayout />
				</ResizablePanel>

				<ResizableHandle />
				<ResizablePanel>
					<RouterView />
				</ResizablePanel>
			</ResizablePanelGroup>
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
	<AppLoader />
</template>
