<script setup lang="ts">
import UserGeneralWallpaper from '../aside-tabs/UserGeneralWallpaper.vue';
</script>

<template>
	<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
	<aside
		class="relative z-6 h-screen max-w-105 min-w-105 bg-accent max-[925px]:hidden"
	>
		<!-- <UserChatList /> -->
		<!-- <UserSettings /> -->
		<!-- <UserNotify /> -->
		<!-- <UserEditProfile /> -->
		<!-- <UserStorage /> -->
		<!-- <UserPrivacy /> -->
		<!-- <UserPrivacyBlocked /> -->
		<!-- <UserPrivacyChangeEmail /> -->
		<UserGeneralWallpaper />
		<!-- <UserGeneral /> -->
		<!-- <AsideNavButtonCreate /> -->
	</aside>
</template>
