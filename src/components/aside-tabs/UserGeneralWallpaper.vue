<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox';
import { CameraIcon, RotateCcwIcon } from 'lucide-vue-next';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';
import Label from '../ui/label/Label.vue';
import { ScrollArea } from '../ui/scroll-area';
import TabTitle from './TabTitle.vue';

function getRandomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
</script>

<template>
	<div class="h-full min-h-0 overflow-hidden">
		<div id="user-general-wallpaper" class="flex h-full flex-col">
			<TabTitle class="bg-white py-2.5" title="Chat Wallpaper" />
			<ScrollArea class="min-h-0 flex-1">
				<div class="bg-white">
					<div class="mb-5 p-2">
						<BaseNavigationItem label="Upload Wallpaper" :icon="CameraIcon" />
						<BaseNavigationItem
							label="Reset to Default"
							:icon="RotateCcwIcon"
						/>

						<!--TODO: disable checkbox before select image-->
						<BaseNavigationItem :as="Label">
							<Checkbox id="wallpaper" class="size-5 rounded-[5px]" />
							<span class="text-[16px] leading-normal"
								>Blur Wallpaper Image</span
							>
						</BaseNavigationItem>
					</div>
				</div>
				<div class="grid grid-cols-3 gap-1 bg-white p-2">
					<div
						v-for="num in 30"
						:key="num"
						class="h-33 cursor-pointer"
						:style="{ backgroundColor: getRandomColor() }"
					></div>
				</div>
			</ScrollArea>
		</div>
	</div>
</template>
