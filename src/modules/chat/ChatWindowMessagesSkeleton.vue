<script setup lang="ts">
import { Skeleton } from '@/app/components/ui/skeleton';
</script>

<template>
	<div
		v-for="num in 30"
		:key="num"
		class="message-group flex min-h-14"
		:class="num % 2 !== 0 ? 'justify-end' : 'justify-start'"
	>
		<div class="mr-1.25 flex items-end" v-if="num % 2 === 0">
			<Skeleton class="size-14 rounded-full bg-gray-500/50" />
		</div>

		<Skeleton
			class="message w-full max-w-[90%] rounded-md bg-gray-500/50 p-2.5 md:max-w-[70%]"
			style="box-shadow: 0 1px 2px #10232f26"
		/>
	</div>
</template>
