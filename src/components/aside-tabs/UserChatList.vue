<script setup lang="ts">
import AsideNavHeader from '../aside/AsideNavHeader.vue';
import { ScrollArea } from '../ui/scroll-area';
import UserChatListItem from './UserChatListItem.vue';
</script>

<template>
	<div class="min-h-0 flex-1 overflow-hidden">
		<AsideNavHeader />

		<!-- 56px - высота шапки -->
		<ScrollArea class="h-[calc(100%-56px)] flex-1">
			<ul class="bg-white px-2.5">
				<UserChatListItem v-for="num in 50" :key="num" />
			</ul>
		</ScrollArea>
	</div>
</template>
