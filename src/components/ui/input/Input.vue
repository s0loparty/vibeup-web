<script setup lang="ts">
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
	<input v-model="modelValue"
		class="h-13.5 peer w-full rounded-md border border-gray-300 px-3 py-2 placeholder-transparent focus:border-blue-500 focus:outline-none focus:placeholder:relative focus:placeholder:-top-full" />
</template>
