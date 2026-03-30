<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useAppColor } from '@/composables/useAppColor';
import { ImageIcon, RotateCcwIcon } from 'lucide-vue-next';
import BaseColorPicker from '../base/BaseColorPicker.vue';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';
import { Button } from '../ui/button';
import TabTitle from './TabTitle.vue';

const { appColor, resetColor } = useAppColor();
</script>

<template>
	<div class="h-full bg-white">
		<div id="user-general">
			<TabTitle title="General" />

			<div class="space-y-2 px-2">
				<div class="space-y-2 px-6">
					<div class="leading-normal">App main color</div>
					<div class="flex w-full items-center gap-x-2">
						<BaseColorPicker v-model="appColor" class="w-full" />
						<Button variant="outline" class="h-9.5" @click="resetColor">
							<RotateCcwIcon />
						</Button>
					</div>
				</div>

				<div class="space-y-2 px-2">
					<!-- message text size -->
					<div class="p-4">
						<div class="flex items-center justify-between">
							<span class="mb-3.75 block">Message Text Size</span>
							<span class="mb-3.75 block">16</span>
						</div>
						<Slider :default-value="[50]" :max="100" :step="1" class="w-full" />
					</div>

					<!-- go to chat wallpaper settigns  -->
					<BaseNavigationItem
						label="Chat Wallpaper"
						:icon="ImageIcon"
						@click="$router.push({ name: 'settings:general:wallpaper' })"
					/>
				</div>

				<div class="space-y-2 px-2">
					<div class="px-4 leading-normal font-semibold text-brand-500">
						Color theme
					</div>
					<RadioGroup default-value="day">
						<BaseNavigationItem
							as="label"
							for="day"
							class="text-black hover:text-black"
						>
							<RadioGroupItem id="day" value="day" />
							<span class="text-base leading-normal">Day</span>
						</BaseNavigationItem>
						<BaseNavigationItem
							as="label"
							for="night"
							class="text-black hover:text-black"
						>
							<RadioGroupItem id="night" value="night" />
							<span class="text-base leading-normal">Night</span>
						</BaseNavigationItem>
					</RadioGroup>
				</div>
			</div>
		</div>
	</div>
</template>
