<script setup lang="ts">
import { direction } from '@/composables/useRouteTransition';

function getTransition() {
	return direction.value === 'forward' ? 'slide-left' : 'slide-right';
}
</script>

<template>
	<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
	<aside
		class="relative z-6 flex h-screen max-w-105 min-w-105 flex-col bg-accent max-[925px]:hidden"
	>
		<RouterView v-slot="{ Component, route }">
			<Transition :name="getTransition()">
				<KeepAlive>
					<component :is="Component" :key="route.fullPath" />
				</KeepAlive>
			</Transition>
		</RouterView>
	</aside>
</template>
