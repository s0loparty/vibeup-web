<script setup lang="ts">
import { AtSignIcon } from 'lucide-vue-next';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';
import TabTitle from './TabTitle.vue';
</script>

<template>
	<div class="settings-header bg-white">
		<div class="settings-header-top">
			<div>
				<TabTitle title="Settings" />

				<div class="relative">
					<img
						class="min-h-90.5 w-full object-cover"
						src="https://i.pinimg.com/originals/5b/18/9d/5b189ddbad90269952a0ca4b20634ec6.jpg"
						alt="Alex Darkstalker 2016"
					/>

					<div
						class="absolute right-4 bottom-4 left-4 flex w-max max-w-[calc(100%-32px)] min-w-37.5 flex-col rounded-md bg-black/50 p-4 backdrop-blur-[2px]"
					>
						<span class="text-lg leading-normal font-semibold text-white">
							Anime Tyanochka ^_^
						</span>
						<span class="text-gray-300"> Был(а) в сети в 13:37 </span>
					</div>
				</div>

				<div class="app-shadow p-2">
					<BaseNavigationItem
						label="Anime T9n"
						sublabel="Username"
						:icon="AtSignIcon"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
