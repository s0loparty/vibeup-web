<script setup lang="ts">
import { cn } from '@/shared/lib/utils';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
	emoji: {
		emoji: string;
		isActive: boolean;
	};
	class?: HTMLAttributes['class'];
}>();
</script>

<template>
	<button
		v-bind="$attrs"
		:class="
			cn(
				'flex size-7 items-center justify-center rounded-sm text-base',
				props.emoji.isActive && 'bg-accent',
				props.class,
			)
		"
		data-slot="emoji-picker-emoji"
	>
		{{ props.emoji.emoji }}
	</button>
</template>
