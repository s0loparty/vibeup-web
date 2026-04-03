<script setup lang="ts">
import BaseColorPicker from '@/app/components/base/BaseColorPicker.vue';
import BaseNavigationItem from '@/app/components/base/BaseNavigationItem.vue';
import { Button } from '@/app/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Slider } from '@/app/components/ui/slider';
import { useAppColor } from '@/app/composables/useAppColor';
import { useFontSize } from '@/app/composables/useFontSize';
import { ImageIcon, RotateCcwIcon } from 'lucide-vue-next';
import { computed } from 'vue';
import TabTitle from './TabTitle.vue';

const { appColor, resetColor } = useAppColor();
const { fontSize, resetFontSize, MIN_FONT_SIZE, MAX_FONT_SIZE } = useFontSize();

// Slider работает с диапазоном 0-100, конвертируем в реальный размер
const sliderValue = computed({
	get: () => {
		const range = MAX_FONT_SIZE - MIN_FONT_SIZE;
		return [((fontSize.value - MIN_FONT_SIZE) / range) * 100];
	},
	set: (value: number[]) => {
		const range = MAX_FONT_SIZE - MIN_FONT_SIZE;
		const firstValue = value[0] ?? 0;
		fontSize.value = Math.round(MIN_FONT_SIZE + (firstValue / 100) * range);
	},
});
</script>

<template>
	<div class="h-full bg-white">
		<div id="user-general">
			<TabTitle title="General" />

			<div class="space-y-2 px-2">
				<!-- go to chat wallpaper settigns  -->
				<div class="px-2">
					<BaseNavigationItem
						label="Chat Wallpaper"
						:icon="ImageIcon"
						@click="$router.push({ name: 'settings:general:wallpaper' })"
					/>
				</div>

				<div class="space-y-2 px-6">
					<div class="leading-normal">App main color</div>
					<div class="flex w-full items-center gap-x-2">
						<BaseColorPicker v-model="appColor" class="w-full" />
						<Button variant="outline" class="h-9.5" @click="resetColor">
							<RotateCcwIcon />
						</Button>
					</div>
				</div>

				<div class="w-f px-6 py-4">
					<div class="flex items-center gap-x-2">
						<div class="w-full">
							<span class="mb-3 block">App Text Size — {{ fontSize }}</span>
							<Slider
								v-model="sliderValue"
								:max="100"
								:step="1"
								class="w-full"
							/>
						</div>

						<Button variant="outline" class="h-9.5" @click="resetFontSize">
							<RotateCcwIcon />
						</Button>
					</div>
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
