<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import { Button } from '@/app/components/ui/button';
import { useTransformDate } from '@/app/composables/useTransformDate';
import { useAppMenuStore } from '@/app/stores/useAppMenuStore';
import { useAuthStore } from '@/app/stores/useAuthStore.ts';
import type { PublicChat } from '@/shared/api';
import {
	ArrowLeftIcon,
	CirclePlayIcon,
	PinIcon,
	SearchIcon,
} from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useMessageSearchInput } from '../messages/composables/useMessageSearchInput';
import MessagesSearchInput from '../messages/MessagesSearchInput.vue';
import { useChatMessagesStore } from '../messages/stores/useChatMessagesStore.ts';
import ChatWindowHeaderOptions from './ChatWindowHeaderOptions.vue';
import { useDialogCreateVideochat } from './composables/useDialogCreateVideochat.ts';

const { showUserInfo, showAside } = storeToRefs(useAppMenuStore());
const chatMessagesStore = useChatMessagesStore();
const authStore = useAuthStore();

const props = defineProps<{ chat: PublicChat }>();

const { formatDateFull, formatDateHours, isToday } = useTransformDate();
const { searchInput, findedMsg, findedIsLoading } = useMessageSearchInput();

const { showDialogCreateVideochat } = useDialogCreateVideochat();

const companion = computed(() => {
	return props.chat.members.find((m) => m.id !== authStore.user?.id!)!;
});

const lastSeenAt = computed(() => {
	return isToday(companion.value.last_seen_at!)
		? formatDateHours(companion.value.last_seen_at!)
		: formatDateFull(companion.value.last_seen_at!);
});
</script>

<template>
	<div
		id="user-chat-header"
		class="relative z-5 flex h-14 shrink-0 items-center bg-white"
	>
		<Button
			@click="showAside = !showAside"
			variant="ghost"
			class="p-0 lg:hidden"
		>
			<ArrowLeftIcon class="size-6 text-gray-500" />
		</Button>

		<div class="flex w-full items-center justify-between px-2 xs:px-4">
			<div
				v-if="!chatMessagesStore.isShowSearch"
				class="flex cursor-pointer items-center gap-2.5"
				@click="showUserInfo = true"
			>
				<!--аватарка-->
				<BaseAvatar
					:src="companion.avatar?.thumbnail"
					:name="companion.username"
					class="size-11 bg-gray-500/50 text-sm text-white"
				/>
				<div class="flex max-w-full min-w-0 flex-col">
					<span class="truncate leading-normal font-semibold text-ellipsis">
						{{ companion.username }}
					</span>
					<span class="text-sm text-gray-500">
						был(а) в сети в {{ lastSeenAt }}
					</span>
				</div>
			</div>

			<MessagesSearchInput
				v-model.trim="searchInput"
				:is-loading="findedIsLoading"
				:finded-messages="findedMsg"
				:is-searching="chatMessagesStore.isShowSearch"
				@close="chatMessagesStore.toggleSearch"
			/>

			<div class="flex items-center justify-between gap-2.5">
				<!-- pin messages -->
				<Button
					variant="ghost"
					size="icon"
					class="hidden p-0 lg:flex"
					title="Закреплённые сообщения"
				>
					<PinIcon class="size-6 text-gray-500" />
				</Button>

				<!-- search -->
				<Button
					variant="ghost"
					size="icon"
					class="hidden p-0 lg:flex"
					title="Поиск по чату"
					@click="chatMessagesStore.toggleSearch"
				>
					<SearchIcon class="size-6 text-gray-500" />
				</Button>

				<Button
					variant="ghost"
					size="icon"
					class="hidden p-0 lg:flex"
					title="Начать видеочат"
					@click="showDialogCreateVideochat = true"
				>
					<CirclePlayIcon class="size-6 text-gray-500" />
				</Button>

				<!-- other buttons -->
				<ChatWindowHeaderOptions
					v-model:dialog-create-videochat="showDialogCreateVideochat"
				/>
			</div>
		</div>
	</div>
</template>
