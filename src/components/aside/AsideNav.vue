<script setup lang="ts">
import AsideNavChatlist from './AsideNavChatlist.vue';
</script>

<template>
	<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
	<aside
		class="app-shadow relative z-6 flex h-screen max-w-105 min-w-105 flex-col bg-accent max-[925px]:hidden"
	>
		<AsideNavChatlist />
		<!-- <UserSettings /> -->
		<!-- <UserNotify /> -->
		<!-- <UserEditProfile /> -->
		<!-- <UserStorage /> -->
		<!-- <UserPrivacy /> -->
		<!-- <UserGeneral /> -->
		<!-- <AsideNavButtonCreate /> -->
	</aside>
</template>
