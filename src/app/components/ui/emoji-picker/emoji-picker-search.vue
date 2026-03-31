<script setup lang="ts">
import { cn } from '@/shared/lib/utils';
import { SearchIcon } from 'lucide-vue-next';
import type { HTMLAttributes } from 'vue';
import { default as EmojiPickerPrimitive } from 'vue-frimousse';

interface Props {
	class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
	<div
		:class="
			cn('flex h-9 items-center gap-2 border-b bg-popover px-3', props.class)
		"
		data-slot="emoji-picker-search-wrapper"
	>
		<SearchIcon class="size-4 shrink-0 opacity-50" />
		<EmojiPickerPrimitive.Search
			class="m-0 flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
			data-slot="emoji-picker-search"
			v-bind="$attrs"
		/>
	</div>
</template>
