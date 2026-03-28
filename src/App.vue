<script setup lang="ts">
import RegisterUser from './views/auth/RegisterUser.vue';
</script>

<template>
	<main class="app-container app-shadow">
		<!--TODO: УСЛОВИЕ КОГДА ВСЯКИЕ АУФ РЕГИ СТАВИТЬ ПО ЦЕНТРУ-->
		<div class="flex min-h-dvh justify-center">
			<!-- <AsideNav /> -->
			<!-- <ChatWindow /> -->
			<!-- <ChatUserinfo /> -->
			<!-- <LoginUser /> -->
			<RegisterUser />
		</div>
	</main>
</template>
