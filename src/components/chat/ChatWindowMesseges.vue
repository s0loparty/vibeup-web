<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatWallpaper } from '@/composables/useChatWallpaper';
import TWallpaper from '@twallpaper/vue';
import '@twallpaper/vue/css';

const { wallpaper } = useChatWallpaper();
</script>

<template>
	<div class="relative min-h-0 flex-1 overflow-hidden">
		<!-- <img :src="space" alt="" class="absolute inset-0 opacity-10" /> -->
		<!-- Wallpaper background -->
		<TWallpaper
			:options="wallpaper"
			:key="wallpaper.pattern?.image"
			:style="`opacity: ${wallpaper.pattern?.opacity || 1}`"
		/>

		<!-- Content with transparent background -->
		<ScrollArea class="relative h-full">
			<div class="chat space-y-3 p-4">
				<!-- Example message groups with alternating alignment -->
				<div
					v-for="(num, index) in 30"
					:key="num"
					class="message-group flex"
					:class="index % 2 === 0 ? 'justify-end' : 'justify-start'"
				>
					<div
						class="message max-w-[90%] rounded-md p-2.5 md:max-w-[70%]"
						:class="
							index % 2 === 0
								? 'bg-brand-500 text-white'
								: 'bg-white text-gray-800'
						"
						style="box-shadow: 0 1px 2px #10232f26"
					>
						<!--TODO: ДОБАВИТЬ ВРЕМЯ ОТПРАВКИ СООБЩЕНИЙ-->
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
						perferendis facere dolore deserunt sunt eveniet voluptatem dolores
						nisi id unde amet obcaecati sapiente soluta quo odit atque natus, et
						numquam.
					</div>
				</div>
			</div>
		</ScrollArea>
	</div>
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
:deep(.tw-canvas.tw-mask) {
	position: absolute;
}
</style>
