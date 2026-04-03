<script setup lang="ts">
import { Button } from '@/app/components/ui/button';
import { cn } from '@/shared/lib/utils';
import type { LucideIcon } from 'lucide-vue-next';
import { type AllowedComponentProps } from 'vue';
import type { ComponentProps } from 'vue-component-type-helpers';

type ButtonAs = ComponentProps<typeof Button>['as'];

type Props = {
	label?: string;
	sublabel?: string;
	icon?: LucideIcon;
	as?: ButtonAs;
	labelClass?: AllowedComponentProps['class'];
};

const props = defineProps<Props>();
const slots = defineSlots<{ default?: unknown }>();
</script>

<template>
	<Button
		:class="
			cn(
				'group flex h-auto min-h-12 w-full justify-start gap-3 px-4 py-2 text-gray-500 hover:text-gray-500',
				$attrs['class'],
			)
		"
		v-bind="props"
		variant="ghost"
	>
		<component v-if="props.icon" :is="props.icon" class="size-6 text-inherit" />

		<slot v-if="slots.default" />

		<div v-else class="flex flex-col items-start">
			<span
				:class="[
					props.labelClass ? '' : 'text-black',
					cn('text-base leading-normal', props.labelClass ?? ''),
				]"
			>
				{{ props.label }}
			</span>

			<span v-if="props.sublabel" class="text-sm text-inherit">
				{{ props.sublabel }}
			</span>
		</div>
	</Button>
</template>
