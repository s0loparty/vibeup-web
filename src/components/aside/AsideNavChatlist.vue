<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import AsideNavHeader from './AsideNavHeader.vue';
</script>

<template>
	<div>
		<AsideNavHeader />

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
					<p
						class="truncate text-sm leading-normal text-ellipsis text-gray-400"
					>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
						placeat facilis labore itaque facere? Ipsum sunt exercitationem
						maiores placeat libero.
					</p>
				</div>
			</li>
		</ul>
	</div>
</template>
