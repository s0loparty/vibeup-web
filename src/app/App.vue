<script setup lang="ts">
import AsideNav from '@/modules/aside/pages/AsideNav.vue';
import ChatUserinfo from '@/modules/chat/chat-userinfo/ChatUserinfo.vue';
import ChatWindow from '@/modules/chat/ChatWindow.vue';
import { ref } from 'vue';
import { useAppColor } from './composables/useAppColor';

const appColor = useAppColor();
const isAuth = ref(true);

appColor.setHtmlColor();
</script>

<template>
	<main
		v-if="isAuth"
		class="app-container overflow-x-hidden"
		style="box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1)"
	>
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
