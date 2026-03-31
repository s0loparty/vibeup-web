<script setup lang="ts">
import { Button } from '@/app/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
	BookmarkIcon,
	MenuIcon,
	SearchIcon,
	SettingsIcon,
} from 'lucide-vue-next';
</script>

<template>
	<div
		class="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 bg-white px-4"
	>
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="ghost" size="icon" class="p-0">
					<MenuIcon class="size-6 text-gray-500" />
				</Button>
			</DropdownMenuTrigger>
			<!--TODO: align-offset в зависимости от ширины экрана-->
			<DropdownMenuContent side="bottom" align="end" :align-offset="-100">
				<DropdownMenuItem>
					<BookmarkIcon /> Сохранённые сообщения
				</DropdownMenuItem>
				<DropdownMenuItem @click="$router.push('/settings')">
					<SettingsIcon /> Настройки
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>

		<!-- search input -->
		<div class="relative w-full">
			<SearchIcon
				class="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400"
			/>
			<input
				type="text"
				placeholder="Поиск"
				class="h-11 w-full rounded-4xl bg-gray-200 pr-2 pl-10 placeholder:font-normal placeholder:text-gray-400"
			/>
		</div>
	</div>
</template>
