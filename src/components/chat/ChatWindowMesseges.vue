<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatScroll } from '@/composables/useChatScroll';
import '@twallpaper/vue/css';
import { ref } from 'vue';
import BaseAvatar from '../base/BaseAvatar.vue';
import BaseScrollButton from '../base/BaseScrollButton.vue';

const scrollAreaRef = ref<InstanceType<typeof ScrollArea> | null>(null);
const { showScrollBtn, handleScroll, scrollToBottom } =
	useChatScroll(scrollAreaRef);
</script>

<template>
	<div class="relative min-h-0 flex-1 overflow-hidden">
		<!-- <img :src="space" alt="" class="absolute inset-0 opacity-10" /> -->
		<!-- Wallpaper background -->

		<!-- Content with transparent background -->
		<ScrollArea
			@scroll="handleScroll"
			ref="scrollAreaRef"
			class="relative h-full"
		>
			<div class="chat mx-auto max-w-175 space-y-3 p-4">
				<!-- Example message groups with alternating alignment -->
				<div
					v-for="(num, index) in 30"
					:key="num"
					class="message-group flex"
					:class="index % 2 === 0 ? 'justify-end' : 'justify-start'"
				>
					<div class="mr-1.25 flex items-end">
						<BaseAvatar
							v-if="index % 2 !== 0"
							class="siz-2"
							src="https://i.pinimg.com/originals/5b/18/9d/5b189ddbad90269952a0ca4b20634ec6.jpg"
							name="avatar"
						/>
					</div>

					<div
						class="message max-w-[90%] rounded-md p-2.5 md:max-w-[70%]"
						:class="
							index % 2 === 0
								? 'bg-brand-500 text-white'
								: 'bg-white text-gray-800'
						"
						style="box-shadow: 0 1px 2px #10232f26"
					>
						<div>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
							perferendis facere dolore deserunt sunt eveniet voluptatem dolores
							nisi id unde amet obcaecati sapiente soluta quo odit atque natus,
							et numquam.
							<div class="text-right text-xs">15:52</div>
						</div>
					</div>
				</div>
			</div>
		</ScrollArea>
		<BaseScrollButton v-if="showScrollBtn" @click="scrollToBottom" />
	</div>
</template>
