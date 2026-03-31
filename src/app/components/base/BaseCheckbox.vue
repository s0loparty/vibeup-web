<script setup lang="ts">
import { Checkbox } from '@/app/components/ui/checkbox';
import { cn } from '@/shared/lib/utils';
import BaseNavigationItem from './BaseNavigationItem.vue';

type Model = boolean | 'indeterminate' | null | undefined;

const model = defineModel<Model>({ required: true });

const props = defineProps<{
	label: string;
}>();
</script>

<template>
	<BaseNavigationItem as="label">
		<Checkbox
			v-model="model"
			:class="cn('size-5 rounded-[5px]', $attrs['class'])"
		/>
		<span class="text-[16px] leading-normal">{{ props.label }}</span>
	</BaseNavigationItem>
</template>
