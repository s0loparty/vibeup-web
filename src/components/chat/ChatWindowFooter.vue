<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { PaperclipIcon, SendIcon, SmileIcon } from 'lucide-vue-next';
</script>

<template>
	<div class="relative z-5 shrink-0 bg-white p-4 shadow-bottom">
		<div class="flex items-center justify-between gap-2.5">
			<div class="relative w-full">
				<Button variant="ghost" size="icon" class="absolute top-2.5 left-2 p-0">
					<SmileIcon class="size-6 text-gray-500" />
				</Button>
				<textarea
					type="text"
					placeholder="Message"
					class="mx-auto block w-full resize-none rounded-[15px] bg-gray-200 px-15 pt-4"
				/>
				<Button
					variant="ghost"
					size="icon"
					class="absolute top-2.5 right-2 p-0"
				>
					<PaperclipIcon class="size-6 text-gray-500" />
				</Button>
			</div>

			<button
				class="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-400"
			>
				<SendIcon class="text-white" />
			</button>
		</div>
	</div>
</template>
