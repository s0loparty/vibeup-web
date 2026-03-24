<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { SearchIcon, EllipsisVerticalIcon, PinIcon, ArrowLeftIcon, } from 'lucide-vue-next';
</script>

<template>
	<div class="user__chat__header bg-white shrink-0">
		<div class="flex justify-between items-center p-4">
			<div class="flex items-center gap-2.5 w-[80%]">
				<Button variant="ghost" class="p-0 hidden max-[925px]:block">
					<ArrowLeftIcon class="size-6 text-gray-500" />
				</Button>
				<!--аватарка-->
				<div class="bg-emerald-300 h-8 w-8 rounded-[50%]"></div>
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
				<Button variant="ghost" size="icon" class="p-0">
					<EllipsisVerticalIcon class="size-6 text-gray-500" />
				</Button>
			</div>
		</div>
	</div>
</template>
