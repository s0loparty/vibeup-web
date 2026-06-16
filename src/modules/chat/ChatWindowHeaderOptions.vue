<script setup lang="ts">
import { Button } from '@/app/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
	CirclePlayIcon,
	EllipsisVerticalIcon,
	LockIcon,
	PinIcon,
	SearchIcon,
	TrashIcon,
	VolumeOffIcon,
} from 'lucide-vue-next';
import { useChatMessagesStore } from '../messages/stores/useChatMessagesStore.ts';
import ChatWindowDialogCreateVideochat from './ChatWindowDialogCreateVideochat.vue';

const dialogCreateVideochatModel = defineModel('dialogCreateVideochat', {
	required: true,
	default: false,
});

const chatMessagesStore = useChatMessagesStore();
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger>
			<Button variant="ghost" size="icon" class="p-0">
				<EllipsisVerticalIcon class="size-6 text-gray-500" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuItem> <VolumeOffIcon />Mute </DropdownMenuItem>
			<DropdownMenuItem> <LockIcon /> Заблокировать </DropdownMenuItem>

			<DropdownMenuItem class="lg:hidden">
				<PinIcon /> Закреп. сообщения
			</DropdownMenuItem>
			<DropdownMenuItem
				class="lg:hidden"
				@click="dialogCreateVideochatModel = false"
			>
				<CirclePlayIcon /> Начать видеочат
			</DropdownMenuItem>
			<DropdownMenuItem
				class="lg:hidden"
				@click="chatMessagesStore.toggleSearch"
			>
				<SearchIcon /> Поиск по чату
			</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem
				class="text-red-500 focus:bg-red-100/50 focus:text-red-600"
			>
				<TrashIcon /> Удалить чат
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>

	<ChatWindowDialogCreateVideochat v-model:open="dialogCreateVideochatModel" />
</template>
