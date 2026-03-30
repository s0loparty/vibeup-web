<script setup lang="ts">
import { ref } from 'vue';
import AsideNav from './components/aside/AsideNav.vue';
import ChatWindow from './components/chat/ChatWindow.vue';
import { useAppColor } from './composables/useAppColor';

const appColor = useAppColor();

const isAuth = ref(true);

appColor.setHtmlColor();
</script>

<template>
	<main v-if="isAuth" class="app-container shadow-bottom">
		<!--TODO: УСЛОВИЕ КОГДА ВСЯКИЕ АУФ РЕГИ СТАВИТЬ ПО ЦЕНТРУ-->
		<div class="flex min-h-dvh justify-center">
			<AsideNav />
			<ChatWindow />
		</div>
	</main>

	<div v-else class="flex items-center justify-center">
		<RouterView />
	</div>
</template>
