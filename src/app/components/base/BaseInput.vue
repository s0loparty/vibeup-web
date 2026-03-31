<script setup lang="ts">
import { Input } from '../ui/input';

const { label, ...props } = defineProps<{ label: string; id: string }>();
const model = defineModel<string | number | undefined>({ required: true });
</script>

<template>
	<div class="relative bg-white">
		<Input
			v-model="model"
			:id="props.id"
			type="text"
			class="peer"
			placeholder="Name"
		/>
		<label
			:for="props.id"
			class="absolute -top-2.5 left-3 h-auto bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-brand-500"
		>
			{{ label }}
		</label>
	</div>
</template>
