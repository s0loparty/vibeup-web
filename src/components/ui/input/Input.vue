<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<{
	(e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
	passive: true,
	defaultValue: props.defaultValue,
});
</script>

<template>
	<input
		v-model="modelValue"
		:class="
			cn(
				'peer h-13.5 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-transparent focus:border-2 focus:border-brand-500 focus:outline-none focus:placeholder:relative focus:placeholder:-top-full',
				$attrs['class'],
			)
		"
	/>
</template>
