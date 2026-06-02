<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import ScrollArea from '@/app/components/ui/scroll-area/ScrollArea.vue';
import { useTransformDate } from '@/app/composables/useTransformDate';
import type { MessagesSearchResponses, PublicMessage } from '@/shared/api';
import { useScrollHander } from '@/shared/utils/useScrollHandler';
import { useMessageSearchInput } from './composables/useMessageSearchInput';
import { useChatMessagesStore } from './stores/useChatMessagesStore';
const { dateOrHours } = useTransformDate();

defineProps<{
	findedMessageList: MessagesSearchResponses['200']['data'];
}>();

const chatSearchStore = useChatMessagesStore();

const {
	findedFetchNextPage,
	findedHasNextPage,
	findedIsFetchingNextPage,
	findedIsError,
} = useMessageSearchInput();

const { scrollHandler } = useScrollHander();

function messageHandler(id: PublicMessage['id']) {
	chatSearchStore.setContextMessageId(id);
	chatSearchStore.toggleSearch();
	chatSearchStore.incrementScrollTick();
}
</script>

<template>
	<ScrollArea
		class="h-76 rounded-b-md shadow"
		@scroll="
			scrollHandler(
				$event,
				findedFetchNextPage,
				findedHasNextPage,
				findedIsFetchingNextPage,
				findedIsError,
			)
		"
	>
		<ul class="bg-white">
			<li
				class="cursor-pointer rounded-sm p-2 transition-colors hover:bg-gray-100"
				v-for="item in findedMessageList"
				:key="item.id"
				@click="messageHandler(item.id)"
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
