<script setup lang="ts">
import { Button } from '../ui/button';
import { ArrowLeftIcon, TrashIcon } from 'lucide-vue-next';
</script>

<template>
	<div class="bg-white">
		<div id="user-storage">
			<div>
				<div class="flex items-center gap-4 w-full py-2">
					<Button variant="ghost">
						<ArrowLeftIcon class="size-6" />
					</Button>
					<span class="font-bold text-xl">Data and Storage</span>
				</div>

				<div class="p-2">
					<div class="flex justify-between p-3">
						<span>Cache Size: </span>
						<span class="text-gray-500 text-sm">100 MB</span>
					</div>
					<Button class="flex gap-4 w-full justify-start p-4 h-auto hover:bg-blue-100/50" variant="ghost">
						<TrashIcon class="size-6 text-blue-400" />
						<span class="text-lg text-blue-400">Clear All</span>
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>
