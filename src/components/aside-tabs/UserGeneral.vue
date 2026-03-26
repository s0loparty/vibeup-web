<script setup lang="ts">
import { Button } from '../ui/button';
import { Slider } from '@/components/ui/slider'
import { ArrowLeftIcon, ImageIcon, } from 'lucide-vue-next';
</script>

<template>
	<div class="bg-white">
		<div id="user-general">
			<div>
				<div class="flex items-center gap-4 w-full py-2">
					<Button variant="ghost">
						<ArrowLeftIcon class="size-6" />
					</Button>
					<span class="font-bold text-xl">General</span>
				</div>
			</div>

			<div class="space-y-2.5">
				<div class="p-2">
					<div class="p-4">
						<span class="block mb-3.75">Message Text Size</span>
						<Slider :default-value="[50]" :max="100" :step="1" class="w-full" />
					</div>
					<Button class="flex gap-4 w-full justify-start p-4 h-auto" variant="ghost">
						<ImageIcon class="size-6 text-gray-500" />
						<span class="text-lg">Chat Wallpaper</span>
					</Button>
				</div>


				<div class="p-2">
					<span class="text-blue-500 font-semibold p-4">Color theme</span>
					<form>
						<Button type="button" class="justify-start p-4 h-auto w-full" variant="ghost">
							<div class="w-full flex items-center gap-4 text-left">
								<input type="radio" id="day" name="theme" value="#">
								<label class="w-full cursor-pointer" for="day">Day</label>
							</div>
						</Button>
						<Button type="button" class="justify-start p-4 h-auto w-full" variant="ghost">
							<div class="w-full flex items-center gap-4 text-left">
								<input type="radio" id="night" name="theme" value="#">
								<label class="w-full cursor-pointer" for="night">Night</label>
							</div>
						</Button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
