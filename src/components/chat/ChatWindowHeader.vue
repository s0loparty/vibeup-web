<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, PinIcon, SearchIcon } from 'lucide-vue-next';
import ChatWindowHeaderOptions from './ChatWindowHeaderOptions.vue';
</script>

<template>
	<div
		id="user-chat-header"
		class="relative z-5 flex h-14 shrink-0 items-center bg-white"
	>
		<div class="flex w-full items-center justify-between px-2 xs:px-4">
			<div class="flex items-center gap-2.5">
				<Button variant="ghost" class="hidden p-0 max-[925px]:block">
					<ArrowLeftIcon class="size-6 text-gray-500" />
				</Button>
				<!--аватарка-->
				<Avatar class="size-11">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div class="flex max-w-full min-w-0 flex-col">
					<span class="truncate leading-normal font-semibold text-ellipsis">
						Alex DarkStalker 2016
					</span>
					<span class="text-sm text-gray-500">был(а) в сети в 13:37</span>
				</div>
			</div>
			<div class="flex items-center justify-between gap-2.5">
				<!-- pin messages -->
				<Button
					variant="ghost"
					size="icon"
					class="hidden p-0 xs:flex"
					title="Закреплённые сообщения"
				>
					<PinIcon class="size-6 text-gray-500" />
				</Button>

				<!-- search -->
				<Button
					variant="ghost"
					size="icon"
					class="hidden p-0 xs:flex"
					title="Поиск по чату"
				>
					<SearchIcon class="size-6 text-gray-500" />
				</Button>

				<!-- other buttons -->
				<ChatWindowHeaderOptions />
			</div>
		</div>
	</div>
</template>
