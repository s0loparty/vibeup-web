<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { SearchIcon, EllipsisVerticalIcon, PinIcon, ArrowLeftIcon, VolumeOffIcon, LockIcon, TrashIcon } from 'lucide-vue-next';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'
</script>

<template>
	<div class="user__chat__header bg-white shrink-0 h-18 flex items-center app-shadow relative z-5">
		<div class="flex justify-between items-center px-4 w-full">
			<div class="flex items-center gap-2.5 w-[80%]">
				<Button variant="ghost" class="p-0 hidden max-[925px]:block">
					<ArrowLeftIcon class="size-6 text-gray-500" />
				</Button>
				<!--аватарка-->
				<Avatar class="size-14">
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div class="flex flex-col">
					<span>Name</span>
					<span class="text-sm text-gray-500">last seen recently</span>
				</div>
			</div>
			<div class="flex justify-between items-center gap-2.5">
				<Button variant="ghost" size="icon" class="p-0">
					<PinIcon class="size-6 text-gray-500" />
				</Button>
				<Button variant="ghost" size="icon" class="p-0">
					<SearchIcon class="size-6 text-gray-500" />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button variant="ghost" size="icon" class="p-0">
							<EllipsisVerticalIcon class="size-6 text-gray-500" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<VolumeOffIcon />Mute
						</DropdownMenuItem>
						<DropdownMenuItem>
							<LockIcon /> Block user
						</DropdownMenuItem>
						<DropdownMenuItem class="text-red-500 hover:text-red-600!">
							<TrashIcon />Delete Chat
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	</div>
</template>
