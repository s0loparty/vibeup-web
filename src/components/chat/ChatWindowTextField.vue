<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const model = defineModel<string>({ required: true });

const editableDiv = ref<HTMLDivElement | null>(null);
const isFocused = ref(false);

// Обработка фокуса
const handleFocus = () => {
	isFocused.value = true;
};

// Обработка потери фокуса
const handleBlur = () => {
	isFocused.value = false;
};

// Обработка ввода
// Не менять innerText на innerHTML
const handleInput = () => {
	if (editableDiv.value) {
		model.value = editableDiv.value.innerText;
	}
};

// Синхронизация при изменении modelValue извне
watch(
	() => model.value,
	(newValue) => {
		if (editableDiv.value && editableDiv.value.innerText !== newValue) {
			editableDiv.value.innerText = newValue || '';
		}
	},
);

// Инициализация при монтировании
onMounted(() => {
	if (editableDiv.value && model.value) {
		editableDiv.value.innerText = model.value;
	}
});
</script>

<template>
	<div class="relative w-full min-w-0 rounded-md bg-white shadow-box">
		<div
			ref="editableDiv"
			contenteditable="true"
			:class="[
				'no-scrollbar max-h-[40vh] w-full overflow-auto rounded-md border px-12 py-4 break-all transition-colors',
				isFocused
					? 'border-brand-500 outline-1 outline-brand-500'
					: 'border-gray-300',
			]"
			@input="handleInput"
			@focus="handleFocus"
			@blur="handleBlur"
		></div>
	</div>
</template>
