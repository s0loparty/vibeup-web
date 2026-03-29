<script setup lang="ts">
import { CameraIcon, RotateCcwIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import BaseCheckbox from '../base/BaseCheckbox.vue';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';
import { ScrollArea } from '../ui/scroll-area';
import TabTitle from './TabTitle.vue';
import UserGeneralWallpaperList from './UserGeneralWallpaperList.vue';

const isChecked = ref<boolean>(false);
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
						<BaseCheckbox v-model="isChecked" label="Blur Wallpaper Image" />
					</div>
				</div>
				<ul class="grid grid-cols-3 gap-1 bg-white p-2">
					<UserGeneralWallpaperList />
				</ul>
			</ScrollArea>
		</div>
	</div>
</template>
