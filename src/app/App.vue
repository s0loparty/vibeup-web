<script setup lang="ts">
import ChatUserinfo from '@/modules/chat/chat-userinfo/ChatUserinfo.vue';
import ChatWindow from '@/modules/chat/ChatWindow.vue';
import { storeToRefs } from 'pinia';
import { useAppColor } from './composables/useAppColor';
import { useAuthStore } from './stores/useAuthStore';

const { isAuthenticated } = storeToRefs(useAuthStore());
const appColor = useAppColor();

appColor.setHtmlColor();
</script>

<template>
	<main
		v-if="isAuthenticated"
		class="app-container overflow-x-hidden"
		style="box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1)"
	>
		<!--TODO: УСЛОВИЕ КОГДА ВСЯКИЕ АУФ РЕГИ СТАВИТЬ ПО ЦЕНТРУ-->
		<div class="relative flex min-h-dvh justify-center">
			<RouterView />
			<ChatWindow />
			<ChatUserinfo />
		</div>
	</main>

	<div v-else class="flex items-center justify-center">
		<RouterView />
	</div>
</template>
