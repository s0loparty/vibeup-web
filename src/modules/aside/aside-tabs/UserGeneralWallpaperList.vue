<script setup lang="ts">
import { STATIC_WALLPAPERS } from '@/app/constants/wallpapers';
import { useChatWallpaper } from '@/modules/chat/composables/useChatWallpaper';
import TWallpaper from '@twallpaper/vue';

const { setWallpaper } = useChatWallpaper();
</script>

<template>
	<ul class="grid h-full grid-cols-3 gap-1 bg-white p-2 shadow-top">
		<li
			v-for="(wallpaper, idx) in STATIC_WALLPAPERS"
			:key="wallpaper.pattern?.image"
			class="relative h-33 cursor-pointer overflow-hidden rounded-sm"
			@click="setWallpaper(wallpaper)"
		>
			<TWallpaper
				:options="wallpaper"
				:key="wallpaper.pattern?.image ?? idx"
				style="z-index: 1"
				:style="`opacity: ${wallpaper.pattern?.opacity || 1}`"
			/>
		</li>
	</ul>
</template>

<style scoped>
/* Ensure the wallpaper covers the entire area */
:deep(.tw-wallpaper) {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}
:deep(.tw-wrap) {
	position: absolute;
}
:deep(.tw-canvas.tw-mask + .tw-pattern) {
	opacity: inherit !important;
}
</style>
