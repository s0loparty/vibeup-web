<script setup lang="ts">
import { ErrorMessage } from 'vee-validate';
import BaseInput from '../BaseInput.vue';

const model = defineModel<string | number | undefined>({ required: true });

const props = defineProps<{
	label: string;
	name: string;
}>();
</script>

<template>
	<div>
		<BaseInput
			v-model="model"
			:id="props.name"
			:label="props.label"
			:name="props.name"
		/>
		<ErrorMessage
			class="inline-block text-sm text-red-500 first-letter:uppercase"
			:name="props.name"
		/>
	</div>
</template>
