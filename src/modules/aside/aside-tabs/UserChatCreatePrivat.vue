<script setup lang="ts">
import BaseInput from '@/app/components/base/BaseInput.vue';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { ref } from 'vue';
import TabTitle from './TabTitle.vue';
import UserBlockedListItem from './UserBlockedListItem.vue';

const privateSearch = ref<string>('');
</script>

<template>
	<div class="min-h-0 flex-1 overflow-hidden bg-white">
		<div class="flex h-full flex-col">
			<TabTitle title="Новый чат" />
			<div class="mb-2.5 bg-white p-4">
				<BaseInput id="create-private" label="Найти" v-model="privateSearch" />
			</div>
			<div class="flex-1 overflow-hidden">
				<ScrollArea class="h-full">
					<ul class="bg-white">
						<UserBlockedListItem v-for="num in 50" :key="num" />
					</ul>
				</ScrollArea>
			</div>
		</div>
	</div>
</template>
