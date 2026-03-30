<script setup lang="ts">
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-vue-next';
defineProps<{
	icon: LucideIcon;
}>();
</script>

<template>
	<button
		:class="
			cn(
				'absolute right-3.75 bottom-3.75 flex h-14 w-14 cursor-pointer items-center justify-center rounded-[50%] bg-brand-400 text-white shadow-[0_0_10px_0_rgba(0,0,0,0.3)]',
				$attrs['class'],
			)
		"
	>
		<component class="text-inherit" :is="icon"></component>
	</button>
</template>
