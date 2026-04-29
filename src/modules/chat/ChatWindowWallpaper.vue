<script setup lang="ts">
import { useChatWallpaper } from '@/modules/chat/composables/useChatWallpaper';
import TWallpaper from '@twallpaper/vue';
import '@twallpaper/vue/css';

const { wallpaper } = useChatWallpaper();
</script>

<template>
	<TWallpaper
		:options="wallpaper"
		:key="wallpaper.pattern?.image"
		:style="`opacity: ${wallpaper.pattern?.opacity || 1}`"
	/>
</template>

<style scoped>
.tw-wallpaper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}
.tw-wrap {
	position: absolute;
}
.tw-canvas.tw-mask {
	position: absolute;
}
</style>
