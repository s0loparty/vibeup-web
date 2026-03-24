<script setup lang="ts">
import ChatWindow from './components/chat/ChatWindow.vue';
import AsideNav from './components/aside/AsideNav.vue';
</script>

<template>
	<main class="app-container app-shadow">
		<div class="flex min-h-dvh">
			<AsideNav />
			<ChatWindow />
		</div>
	</main>
</template>
