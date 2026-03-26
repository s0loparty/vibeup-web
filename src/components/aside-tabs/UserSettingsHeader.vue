<script setup lang="ts">
import { Button } from '../ui/button';
import { ArrowLeftIcon, AtSignIcon, CameraIcon, } from 'lucide-vue-next';
</script>
<template>
	<div class="bg-white settings-header">
		<div class="settings-header-top">
			<div>
				<div class="flex items-center gap-4 w-full py-2">
					<Button variant="ghost">
						<ArrowLeftIcon class="size-6" />
					</Button>
					<span class="font-bold text-xl">Settings</span>
				</div>
				<div class="h-105 relative">
					<img class="h-full" src="https://i.pinimg.com/originals/5b/18/9d/5b189ddbad90269952a0ca4b20634ec6.jpg">
					<div
						class="absolute bottom-4 left-4 flex flex-col w-max p-4 bg-black/50 backdrop-blur-[2px] rounded-md min-w-37.5">
						<span class="font-bold text-white text-2xl">Name</span>
						<span class="text-white">Была в сети 13 мгновений назад</span>
					</div>
					<button class="w-14 h-14 bg-blue-400 rounded-[50%] flex justify-center items-center absolute right-3.75 -bottom-3.75
					shadow-[0_0_10px_0_rgba(0,0,0,0.3)] cursor-pointer">
						<CameraIcon class="text-white" />
					</button>
				</div>

				<div class="p-2 app-shadow">
					<Button class="flex gap-4 w-full justify-start p-4 h-auto" variant="ghost">
						<div>
							<AtSignIcon class="size-6 text-gray-500" />
						</div>
						<div class="flex flex-col items-start">
							<span class="text-lg text-black">Anime T9n</span>
							<span class="text-gray-500">Username</span>
						</div>
					</Button>

				</div>

			</div>
		</div>
	</div>
</template>
