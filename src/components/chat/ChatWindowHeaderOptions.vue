<script setup lang="ts">
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	EllipsisVerticalIcon,
	LockIcon,
	PinIcon,
	SearchIcon,
	TrashIcon,
	VolumeOffIcon,
} from 'lucide-vue-next';
import { Button } from '../ui/button';
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

			<DropdownMenuItem class="xs:hidden">
				<PinIcon /> Закреп. сообщения
			</DropdownMenuItem>
			<DropdownMenuItem class="xs:hidden">
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
</template>
