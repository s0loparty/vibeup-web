<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import AsideNavHeader from './AsideNavHeader.vue';
// import AsideNavChatlist from './AsideNavChatlist.vue';
// import AsideNavButtonCreate from './AsideNavButtonCreate.vue';
// import UserSettings from '../aside-tabs/UserSettings.vue';
// import UserNotify from '../aside-tabs/UserNotify.vue';
// import UserEditProfile from '../aside-tabs/UserEditProfile.vue';
// import UserStorage from '../aside-tabs/UserStorage.vue';
// import UserPrivacy from '../aside-tabs/UserPrivacy.vue';
import UserGeneral from '../aside-tabs/UserGeneral.vue';
</script>

<template>
	<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
	<aside class="bg-accent min-w-105 relative flex flex-col h-screen max-[925px]:hidden app-shadow  z-6">
		<div class="flex-1 min-h-0 overflow-hidden">
			<ScrollArea class="h-full">
				<AsideNavHeader />
				<!-- <AsideNavChatlist /> -->
				<!-- <UserSettings /> -->
				<!-- <UserNotify /> -->
				<!-- <UserEditProfile /> -->
				<!-- <UserStorage /> -->
				<!-- <UserPrivacy /> -->
				<UserGeneral />
				<!-- <AsideNavButtonCreate /> -->
			</ScrollArea>
		</div>
	</aside>
</template>
