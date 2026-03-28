<script setup lang="ts">
import LoginUser from './views/auth/LoginUser.vue';
</script>

<template>
	<main class="app-container app-shadow">
		<!--TODO: УСЛОВИЕ КОГДА ВСЯКИЕ АУФ РЕГИ СТАВИТЬ ПО ЦЕНТРУ-->
		<div class="flex min-h-dvh justify-center">
			<!-- <AsideNav /> -->
			<!-- <ChatWindow /> -->
			<!-- <ChatUserinfo /> -->
			<LoginUser />
		</div>
	</main>
</template>
