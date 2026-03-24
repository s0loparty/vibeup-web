<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
	<div class="flex-1 min-h-0 overflow-hidden">
		<ScrollArea class="h-full">
			<div class="chat p-4 space-y-3">
				<!--ЗДЕСЬ ЧЕРЕДУЕМ JUSTIFY-END & START когда люди чатятся -->
				<div v-for="num in 30" :key="num" class="message-group flex">
					<div class="message bg-white rounded-[30px] p-2.5 shadow-sm md:max-w-[70%] max-w-[90%]">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste perferendis facere dolore deserunt
						sunt eveniet voluptatem dolores nisi id unde amet obcaecati sapiente soluta quo odit atque natus, et
						numquam.
					</div>
				</div>
			</div>
		</ScrollArea>
	</div>
</template>
