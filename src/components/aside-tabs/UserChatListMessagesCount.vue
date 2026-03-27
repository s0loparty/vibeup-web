<script setup lang="ts">
type Props = {
	notifyEnable: boolean;
	count: number;
};

const { notifyEnable, count } = defineProps<Props>();
</script>

<template>
	<div
		:class="[
			'flex h-5.5 shrink-0 items-center justify-center rounded-full px-2 text-xs font-semibold text-white',
			notifyEnable ? 'bg-blue-500' : 'bg-gray-400/70',
		]"
	>
		{{ count }}
	</div>
</template>
