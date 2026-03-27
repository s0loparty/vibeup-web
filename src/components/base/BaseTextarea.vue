<template>
	<div class="relative">
		<div
			ref="editableDiv"
			contenteditable="true"
			:class="[
				'no-scrollbar min-h-20 w-full overflow-auto rounded-md border px-4 py-2 transition-colors',
				'peer',
				isFocused
					? 'border-blue-500 outline-1 outline-blue-500'
					: 'border-gray-300',
			]"
			@input="handleInput"
			@focus="handleFocus"
			@blur="handleBlur"
		></div>
		<label
			:for="id"
			class="pointer-events-none absolute left-3 h-auto bg-white px-1 text-gray-500 transition-all"
			:class="{
				'-top-2.5 text-sm': isFocused || hasContent,
				'text-blue-500': isFocused,
				'top-4 text-base text-gray-400': !isFocused && !hasContent,
			}"
		>
			{{ label }}
		</label>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

type Props = {
	modelValue: string;
	label: string;
	id: string;
};

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const editableDiv = ref<HTMLDivElement | null>(null);
const isFocused = ref(false);

// Проверяем есть ли контент
const hasContent = computed(() => {
	return props.modelValue && props.modelValue.trim().length > 0;
});

// Обработка фокуса
const handleFocus = () => {
	isFocused.value = true;
};

// Обработка потери фокуса
const handleBlur = () => {
	isFocused.value = false;
};

// Обработка ввода
const handleInput = () => {
	if (editableDiv.value) {
		emit('update:modelValue', editableDiv.value.innerText);
	}
};

// Синхронизация при изменении modelValue извне
watch(
	() => props.modelValue,
	(newValue) => {
		if (editableDiv.value && editableDiv.value.innerText !== newValue) {
			editableDiv.value.innerText = newValue || '';
		}
	},
);

// Инициализация при монтировании
onMounted(() => {
	if (editableDiv.value && props.modelValue) {
		editableDiv.value.innerText = props.modelValue;
	}
});
</script>
