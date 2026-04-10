<script setup lang="ts">
import { direction } from '@/app/composables/useRouteTransition';
import { useAppMenuStore } from '@/app/stores/useAppMenuStore';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const { showAside } = storeToRefs(useAppMenuStore());

const breakpoints = useBreakpoints(breakpointsTailwind);
const lgAndSmaller = breakpoints.smaller('lg');

const shouldShowAside = computed(() => {
	if (!lgAndSmaller.value) return true;

	return showAside.value;
});

function getTransition() {
	return direction.value === 'forward' ? 'slide-left' : 'slide-right';
}
</script>

<template>
	<Transition
		enter-active-class="transition-all duration-200 ease"
		leave-active-class="transition-all duration-200 ease"
		enter-from-class="-translate-x-full opacity-0"
		enter-to-class="translate-x-0 opacity-100"
		leave-from-class="translate-x-0 opacity-100"
		leave-to-class="-translate-x-full opacity-0"
	>
		<aside
			v-show="shouldShowAside"
			class="relative z-50 flex h-screen w-full flex-col overflow-hidden bg-accent max-[840px]:absolute max-[840px]:max-w-full max-[840px]:min-w-auto"
		>
			<RouterView v-slot="{ Component, route }">
				<Transition :name="getTransition()">
					<component :is="Component" :key="route.fullPath" />
				</Transition>
			</RouterView>
		</aside>
	</Transition>
</template>
