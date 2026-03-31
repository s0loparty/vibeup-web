<script setup lang="ts">
const props = defineProps<{
	category: {
		label: string;
	};
}>();
</script>

<template>
	<div
		v-bind="$attrs"
		class="bg-popover px-3 pt-3.5 pb-2 text-xs leading-none text-muted-foreground"
		data-slot="emoji-picker-category-header"
	>
		{{ props.category.label }}
	</div>
</template>
