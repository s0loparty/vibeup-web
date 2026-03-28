<script setup lang="ts">
import UserPrivacyChangeEmail from '../aside-tabs/UserPrivacyChangeEmail.vue';
</script>

<template>
	<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
	<aside
		class="relative z-6 flex h-screen max-w-105 min-w-105 flex-col bg-accent max-[925px]:hidden"
	>
		<!-- <UserChatList /> -->
		<!-- <UserSettings /> -->
		<!-- <UserNotify /> -->
		<!-- <UserEditProfile /> -->
		<!-- <UserStorage /> -->
		<!-- <UserPrivacy /> -->
		<!-- <UserPrivacyBlocked /> -->
		<UserPrivacyChangeEmail />
		<!-- <UserGeneral /> -->
		<!-- <AsideNavButtonCreate /> -->
	</aside>
</template>
