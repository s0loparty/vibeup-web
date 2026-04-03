<script setup lang="ts">
import { cn } from '@/shared/lib/utils';
import { LoaderIcon } from 'lucide-vue-next';
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '.';
import { buttonVariants } from '.';

interface Props extends PrimitiveProps {
	variant?: ButtonVariants['variant'];
	size?: ButtonVariants['size'];
	class?: HTMLAttributes['class'];
	isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	as: 'button',
});
</script>

<template>
	<Primitive
		:disabled="isLoading"
		data-slot="button"
		:data-variant="variant"
		:data-size="size"
		:as="as"
		:as-child="asChild"
		:class="cn(buttonVariants({ variant, size }), props.class)"
	>
		<LoaderIcon class="size-6 animate-spin" v-if="isLoading" />
		<slot />
	</Primitive>
</template>
