<script setup lang="ts">
import AsideNav from './components/aside/AsideNav.vue';
import ChatWindow from './components/chat/ChatWindow.vue';
</script>

<template>
	<main class="app-container shadow-bottom">
		<!--TODO: УСЛОВИЕ КОГДА ВСЯКИЕ АУФ РЕГИ СТАВИТЬ ПО ЦЕНТРУ-->
		<div class="flex min-h-dvh justify-center">
			<AsideNav />
			<ChatWindow />
			<!-- <ChatUserinfo /> -->
			<!-- <LoginUser /> -->
			<!-- <RegisterUser /> -->
		</div>
	</main>
</template>
