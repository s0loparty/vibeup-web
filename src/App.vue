<script setup lang="ts">
import AsideNav from './components/aside/AsideNav.vue';
// import ChatUserinfo from './components/chat-userinfo/ChatUserinfo.vue';
import ChatWindow from './components/chat/ChatWindow.vue';
</script>

<template>
	<main class="app-container app-shadow">
		<div class="flex min-h-dvh">
			<AsideNav />
			<ChatWindow />
			<!-- <ChatUserinfo /> -->
		</div>
	</main>
</template>
