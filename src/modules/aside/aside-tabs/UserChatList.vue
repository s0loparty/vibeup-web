<script setup lang="ts">
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useAppMenuStore } from '@/app/stores/useAppMenuStore';
import AsideNavHeader from '@/modules/aside/components/AsideNavHeader.vue';
import { storeToRefs } from 'pinia';
import UserChatListItem from './UserChatListItem.vue';

const { showAside } = storeToRefs(useAppMenuStore());
</script>

<template>
	<div class="min-h-0 flex-1 overflow-hidden">
		<AsideNavHeader />

		<!-- 56px - высота шапки -->
		<ScrollArea class="h-[calc(100%-56px)] flex-1">
			<ul class="bg-white px-2.5" @click="showAside = false">
				<UserChatListItem v-for="num in 50" :key="num" />
			</ul>
		</ScrollArea>
	</div>
</template>
