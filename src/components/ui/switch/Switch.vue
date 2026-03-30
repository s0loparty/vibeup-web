<script setup lang="ts">
import { cn } from '@/lib/utils';
import { reactiveOmit } from '@vueuse/core';
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

const props = defineProps<
	SwitchRootProps & { class?: HTMLAttributes['class'] }
>();

const emits = defineEmits<SwitchRootEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<SwitchRoot
		v-slot="slotProps"
		data-slot="switch"
		v-bind="forwarded"
		:class="
			cn(
				'peer inline-flex h-[0.8rem] w-8.5 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-400 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-input/80',
				props.class,
			)
		"
	>
		<SwitchThumb
			data-slot="switch-thumb"
			:class="
				cn(
					'pointer-events-none block size-5 rounded-full border-2 bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=checked]:border-brand-400 data-[state=unchecked]:translate-x-[calc(0%-2px)] data-[state=unchecked]:border-gray-300 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground',
				)
			"
		>
			<slot name="thumb" v-bind="slotProps" />
		</SwitchThumb>
	</SwitchRoot>
</template>
