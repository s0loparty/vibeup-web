<script setup lang="ts">
import { PinIcon } from 'lucide-vue-next';
import AsideNavHeader from '../aside/AsideNavHeader.vue';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
</script>

<template>
	<div class="min-h-0 flex-1 overflow-hidden">
		<AsideNavHeader />

		<!-- 56px - высота шапки -->
		<ScrollArea class="h-[calc(100%-56px)] flex-1">
			<ul class="bg-white px-2.5">
				<li
					class="flex w-full cursor-pointer items-center gap-x-2 rounded-md p-2 transition-colors hover:bg-gray-100"
					v-for="num in 50"
					:key="num"
				>
					<div>
						<Avatar class="size-14">
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>

					<div class="w-full max-w-full min-w-0">
						<div class="flex items-center justify-between gap-2.5">
							<span class="truncate leading-normal font-semibold text-ellipsis">
								Заголовок чата / Имя Человека
							</span>
							<span class="text-sm text-gray-400">16:41</span>
						</div>
						<div class="flex flex-nowrap gap-x-2">
							<p
								class="truncate text-sm leading-normal text-ellipsis text-gray-400"
							>
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
								placeat facilis labore itaque facere? Ipsum sunt exercitationem
								maiores placeat libero.
							</p>

							<!-- count not read message -->
							<!-- if notify OFF -->
							<div
								class="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-gray-400/70 text-xs font-semibold text-white"
							>
								6
							</div>

							<!-- count not read message -->
							<!-- if notify ON -->
							<div
								class="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white"
							>
								6
							</div>

							<div
								class="flex size-5.5 shrink-0 items-center justify-center rounded-full border border-gray-400"
							>
								<PinIcon class="size-3.5 rotate-45 text-gray-400" />
							</div>
						</div>
					</div>
				</li>
			</ul>
		</ScrollArea>
	</div>
</template>
