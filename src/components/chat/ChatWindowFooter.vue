<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { SendIcon, SmileIcon, PaperclipIcon, } from 'lucide-vue-next';
</script>

<template>
	<div class="shrink-0 bg-white p-4 border-t">
		<div class="flex justify-between items-center gap-2.5">
			<div class="relative w-full">
				<Button variant="ghost" size="icon" class="p-0 absolute left-2 top-2.5">
					<SmileIcon class="size-6 text-gray-500" />
				</Button>
				<textarea type="text" placeholder="Message"
					class="w-full bg-gray-200 pt-4 px-15 rounded-[15px] block mx-auto resize-none" />
				<Button variant="ghost" size="icon" class="p-0 absolute right-2 top-2.5">
					<PaperclipIcon class="size-6 text-gray-500" />
				</Button>
			</div>

			<button class="w-14 h-14 bg-blue-400 rounded-[50%] flex justify-center items-center cursor-pointer shrink-0">
				<SendIcon class="text-white" />
			</button>
		</div>
	</div>
</template>
