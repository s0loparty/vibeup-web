<script setup lang="ts">
import BaseCheckbox from '@/app/components/base/BaseCheckbox.vue';
import BaseNavigationItem from '@/app/components/base/BaseNavigationItem.vue';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { CameraIcon, RotateCcwIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import TabTitle from './TabTitle.vue';
import UserGeneralWallpaperList from './UserGeneralWallpaperList.vue';

const isChecked = ref(false);
</script>

<template>
	<div class="h-full min-h-0 overflow-hidden">
		<div id="user-general-wallpaper" class="flex h-full flex-col">
			<TabTitle class="bg-white py-2.5" title="Chat Wallpaper" />
			<ScrollArea class="min-h-0 flex-1">
				<div class="bg-white shadow-box">
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

				<UserGeneralWallpaperList />
			</ScrollArea>
		</div>
	</div>
</template>
