<script setup lang="ts">
import { useIsMutating } from '@tanstack/vue-query';
import { LoaderIcon } from 'lucide-vue-next';
import type { QueryMeta } from '../types/query-meta';

const isLoading = useIsMutating({
	predicate: (mutation) => {
		const mutationMeta = mutation.meta as QueryMeta;
		return mutationMeta?.loader === 'global';
	},
});
</script>

<template>
	<Transition
		enter-active-class="transition-all duration-200 ease"
		leave-active-class="transition-all duration-200 ease"
		enter-from-class="opacity-0"
		enter-to-class="opacity-1"
		leave-from-class="opacity-1"
		leave-to-class="opacity-0"
	>
		<div
			v-if="isLoading"
			class="fixed inset-0 z-999 flex items-center justify-center bg-brand-500/70 backdrop-blur-sm"
		>
			<LoaderIcon class="size-12 animate-spin text-white" />
		</div>
	</Transition>
</template>
