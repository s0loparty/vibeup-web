<script setup lang="ts">
import { ref } from 'vue';
import AsideNav from './components/aside/AsideNav.vue';
import ChatUserinfo from './components/chat-userinfo/ChatUserinfo.vue';
import ChatWindow from './components/chat/ChatWindow.vue';
import { useAppColor } from './composables/useAppColor';

const appColor = useAppColor();
const isAuth = ref(true);

appColor.setHtmlColor();
</script>

<template>
	<main v-if="isAuth" class="app-container overflow-x-hidden shadow-bottom">
		<!--TODO: УСЛОВИЕ КОГДА ВСЯКИЕ АУФ РЕГИ СТАВИТЬ ПО ЦЕНТРУ-->
		<div class="relative flex min-h-dvh justify-center">
			<AsideNav />
			<ChatWindow />
			<ChatUserinfo />
		</div>
	</main>

	<div v-else class="flex items-center justify-center">
		<RouterView />
	</div>
</template>
