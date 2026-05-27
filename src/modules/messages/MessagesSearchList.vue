<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import ScrollArea from '@/app/components/ui/scroll-area/ScrollArea.vue';
import { useTransformDate } from '@/app/composables/useTransformDate';
import type { MessagesSearchResponses } from '@/shared/api';
const { dateOrHours } = useTransformDate();

defineProps<{
	findedMessageList: MessagesSearchResponses['200']['data'];
}>();
</script>

<template>
	<ScrollArea class="h-76 rounded-b-md shadow">
		<ul class="bg-white">
			<li
				class="cursor-pointer rounded-sm p-2 transition-colors hover:bg-gray-100"
				v-for="item in findedMessageList"
				:key="item.id"
			>
				<div class="flex items-center gap-2">
					<BaseAvatar
						:name="item.sender?.username"
						:src="item.sender?.avatar?.thumbnail"
						class="size-10"
					/>
					<div class="grow">
						<div class="text-sm font-bold">{{ item.sender?.username }}</div>
						<div class="text-sm" v-html="item.body"></div>
					</div>
					<time class="text-sm text-gray-500">{{
						dateOrHours(item.created_at)
					}}</time>
				</div>
			</li>
		</ul>
	</ScrollArea>
</template>
