<script setup lang="ts">
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/app/components/ui/popover';
import { Megaphone, PencilIcon, UserRoundIcon } from 'lucide-vue-next';
</script>
<template>
	<Popover>
		<PopoverTrigger as-child>
			<button
				class="absolute right-3.75 bottom-3.75 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-brand-500 shadow-[0_0_10px_0_rgba(0,0,0,0.3)]"
			>
				<PencilIcon class="text-white" />
			</button>
		</PopoverTrigger>

		<PopoverContent align="end" class="w-60 cursor-pointer bg-white/95 p-1">
			<button
				class="flex w-full items-center gap-2.5 rounded-sm p-2.5 hover:bg-gray-100"
				@click="$router.push({ name: 'create-group' })"
			>
				<Megaphone />
				<span class="text-sm">Новый групповой чат</span>
			</button>
			<button
				class="flex w-full items-center gap-2.5 rounded-sm p-2.5 hover:bg-gray-100"
				@click="$router.push({ name: 'create-private' })"
			>
				<UserRoundIcon />
				<span class="text-sm">Новый чат</span>
			</button>
		</PopoverContent>
	</Popover>
</template>
