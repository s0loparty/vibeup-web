<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import AsideNavHeader from './AsideNavHeader.vue';
// import AsideNavChatlist from './AsideNavChatlist.vue';
import AsideNavButtonCreate from './AsideNavButtonCreate.vue';
import UserSettings from '../aside-tabs/UserSettings.vue';
</script>

<template>
	<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
	<aside class="bg-accent min-w-105 relative flex flex-col h-screen max-[925px]:hidden app-shadow  z-6">
		<div class="flex-1 min-h-0 overflow-hidden">
			<ScrollArea class="h-full">
				<AsideNavHeader />
				<!-- <AsideNavChatlist /> -->
				<UserSettings />
				<AsideNavButtonCreate />
			</ScrollArea>
		</div>
	</aside>
</template>
