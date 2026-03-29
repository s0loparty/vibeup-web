<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';
import BaseNavButton from '../base/BaseNavButton.vue';
import { ScrollArea } from '../ui/scroll-area';
import TabTitle from './TabTitle.vue';
import UserBlockedListItem from './UserBlockedListItem.vue';
</script>

<template>
	<div class="min-h-0 flex-1 overflow-hidden bg-white">
		<div id="user-blocked">
			<div>
				<TabTitle title="Blocked Users" />
				<div class="mb-2.5 bg-gray-300/60 p-4">
					<span class="text-black/50">
						Заблокированые пользователи не могут отпрвлять сообщения или
						добавлять в группу. Они не видят ваш профиль, фото, онлайн - статус
						и т.д.
					</span>
				</div>
				<ScrollArea class="h-screen">
					<ul class="bg-white">
						<UserBlockedListItem v-for="num in 50" :key="num" />
					</ul>
				</ScrollArea>
			</div>
			<BaseNavButton :icon="PlusIcon" />
		</div>
	</div>
</template>
