<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { ImageIcon } from 'lucide-vue-next';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';
import TabTitle from './TabTitle.vue';
</script>

<template>
	<div class="bg-white">
		<div id="user-general">
			<TabTitle title="General" />

			<div class="space-y-2.5">
				<div class="space-y-2 p-2">
					<div class="p-4">
						<div class="flex items-center justify-between">
							<span class="mb-3.75 block">Message Text Size</span>
							<span class="mb-3.75 block">16</span>
						</div>
						<Slider :default-value="[50]" :max="100" :step="1" class="w-full" />
					</div>

					<BaseNavigationItem label="Chat Wallpaper" :icon="ImageIcon" />
				</div>

				<div class="space-y-2 px-2.5">
					<div class="px-4 leading-normal font-semibold text-blue-500">
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
