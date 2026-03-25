<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MenuIcon, SettingsIcon, BookmarkIcon, } from 'lucide-vue-next';
</script>

<template>
	<div class="flex justify-between items-center px-4 gap-4 h-18 sticky top-0 bg-white">
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="ghost" size="icon" class="p-0">
					<MenuIcon class="size-6 text-gray-500" />
				</Button>
			</DropdownMenuTrigger>
			<!--TODO: align-offset в зависимости от ширины экрана-->
			<DropdownMenuContent side="bottom" align="end" :align-offset="-100">
				<DropdownMenuItem>
					<BookmarkIcon /> Saved Messages
				</DropdownMenuItem>
				<DropdownMenuItem>
					<SettingsIcon /> Settings
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		<input type="text" placeholder="search_user" class="w-full bg-gray-200 rounded-[20px] px-3 py-3" />
	</div>
</template>
