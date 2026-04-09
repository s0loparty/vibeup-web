<script setup lang="ts">
import BaseNavigationItem from '@/app/components/base/BaseNavigationItem.vue';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/app/components/ui/tooltip';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { useClipboard } from '@vueuse/core';
import { AtSignIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import TabTitle from './TabTitle.vue';

const authStore = useAuthStore();
const { copy } = useClipboard();

const showTooltip = ref(false);

function copyHandler() {
	copy(authStore.user?.username || '');
	showTooltip.value = true;
	setTimeout(() => {
		showTooltip.value = false;
	}, 1500);
}
</script>

<template>
	<div id="user-settings-header" class="bg-white">
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
							{{ authStore.user?.username }}
						</span>
						<span class="text-gray-300">
							<!--TODO ВРЕМЕННО ВЫГЛЯДИТ КАК ОТСТОЙ НАДО ЗАМЕНИТЬ-->
							Был(а) в сети
							{{ authStore.user?.last_seen_at }}
						</span>
					</div>
				</div>

				<div class="p-2 shadow-bottom">
					<TooltipProvider>
						<Tooltip :open="showTooltip">
							<TooltipTrigger as-child>
								<div @click="copyHandler">
									<BaseNavigationItem
										:label="authStore.user?.username"
										sublabel="Username"
										:icon="AtSignIcon"
									/>
								</div>
							</TooltipTrigger>
							<TooltipContent :side-offset="-15"> Скопировано! </TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	</div>
</template>
