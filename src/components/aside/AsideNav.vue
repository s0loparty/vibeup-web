<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import AsideNavChatlist from './AsideNavChatlist.vue';
</script>

<template>
	<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
	<aside
		class="app-shadow relative z-6 flex h-screen max-w-105 min-w-105 flex-col bg-accent max-[925px]:hidden"
	>
		<div class="min-h-0 flex-1 overflow-hidden">
			<ScrollArea class="h-full">
				<AsideNavChatlist />
				<!-- <UserSettings /> -->
				<!-- <UserNotify /> -->
				<!-- <UserEditProfile /> -->
				<!-- <UserStorage /> -->
				<!-- <UserPrivacy /> -->
				<!-- <UserGeneral /> -->
				<!-- <AsideNavButtonCreate /> -->
			</ScrollArea>
		</div>
	</aside>
</template>
