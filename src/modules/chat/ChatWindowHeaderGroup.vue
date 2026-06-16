<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import { Button } from '@/app/components/ui/button';
import { useAppMenuStore } from '@/app/stores/useAppMenuStore';
import type { PublicChat } from '@/shared/api';
import {
	ArrowLeftIcon,
	CirclePlayIcon,
	PinIcon,
	SearchIcon,
} from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import ChatWindowHeaderOptions from './ChatWindowHeaderOptions.vue';
import { useDialogCreateVideochat } from './composables/useDialogCreateVideochat.ts';

const props = defineProps<{ chat: PublicChat }>();

const { showUserInfo, showAside } = storeToRefs(useAppMenuStore());

const { showDialogCreateVideochat } = useDialogCreateVideochat();
</script>

<template>
	<div
		v-if="props.chat.members.length"
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
				class="flex cursor-pointer items-center gap-2.5"
				@click="showUserInfo = true"
			>
				<!-- TODO -->
				<!--аватарка Здес в нейм надо тайтл группы закинуть вместо юзер нейма для аватарки-->
				<BaseAvatar
					:src="undefined"
					:name="props.chat.display_title"
					class="size-11 bg-gray-500/50 text-sm text-white"
				/>
				<div class="flex max-w-full min-w-0 flex-col">
					<span class="truncate leading-normal font-semibold text-ellipsis">
						{{ props.chat.display_title }}
					</span>
					<!--TODO добавить онлайн сколько людей в группе-->
					<span class="text-sm text-gray-500">
						Участников группы: {{ props.chat.members.length }}
					</span>
				</div>
			</div>

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
