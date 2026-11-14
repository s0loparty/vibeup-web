<script setup lang="ts">
import { cn } from '@/shared/lib/utils';
import { reactiveOmit } from '@vueuse/core';
import type { ScrollAreaRootProps } from 'reka-ui';
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from 'reka-ui';
import { onBeforeUnmount, type HTMLAttributes } from 'vue';
import ScrollBar from './ScrollBar.vue';

const props = defineProps<
	ScrollAreaRootProps & {
		class?: HTMLAttributes['class'];
		viewportClass?: HTMLAttributes['class'];
		viewportRef?: (el: HTMLElement | null) => void;
	}
>();

const emit = defineEmits<{
	scroll: [event: Event];
}>();

const delegatedProps = reactiveOmit(
	props,
	'class',
	'viewportClass',
	'viewportRef',
);

function setViewportRef(el: Element | { $el?: Element } | null) {
	if (el instanceof HTMLElement) {
		props.viewportRef?.(el);
		return;
	}

	if (el && '$el' in el && el.$el instanceof HTMLElement) {
		props.viewportRef?.(el.$el);
		return;
	}

	props.viewportRef?.(null);
}

onBeforeUnmount(() => {
	props.viewportRef?.(null);
});
</script>

<template>
	<ScrollAreaRoot
		data-slot="scroll-area"
		v-bind="delegatedProps"
		:class="cn('relative overflow-hidden', props.class)"
	>
		<ScrollAreaViewport
			:ref="setViewportRef"
			data-slot="scroll-area-viewport"
			:class="
				cn(
					'size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1',
					props.viewportClass,
				)
			"
			@scroll="emit('scroll', $event)"
		>
			<slot />
		</ScrollAreaViewport>

		<ScrollBar />
		<ScrollAreaCorner />
	</ScrollAreaRoot>
</template>
