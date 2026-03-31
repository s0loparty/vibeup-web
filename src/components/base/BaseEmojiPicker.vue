<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
	EmojiPicker,
	EmojiPickerContent,
	EmojiPickerFooter,
	EmojiPickerSearch,
} from '@/components/ui/emoji-picker';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { SmileIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import type { EmojiPickerEmoji } from 'vue-frimousse/src/packages/types.js';

const handleEmojiSelect = (emoji: EmojiPickerEmoji) => {
	console.log(emoji);
};

const isOpen = ref(false);
</script>

<template>
	<Popover v-model:open="isOpen">
		<PopoverTrigger as-child>
			<Button
				variant="ghost"
				size="icon"
				class="absolute bottom-2.5 left-2 z-10 p-0"
			>
				<SmileIcon class="size-6 text-gray-500" />
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-fit rounded-xl p-0">
			<EmojiPicker
				class="h-85.5 border-none! shadow-none!"
				@emoji-select="handleEmojiSelect"
			>
				<EmojiPickerSearch />
				<EmojiPickerContent />
				<EmojiPickerFooter />
			</EmojiPicker>
		</PopoverContent>
	</Popover>
</template>
