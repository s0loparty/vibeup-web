<script setup lang="ts">
import { Skeleton } from '@/app/components/ui/skeleton';
</script>

<template>
	<div class="min-h-dvh space-y-2 bg-white px-2.5">
		<div v-for="num in 30" :key="num" class="flex items-center space-x-4">
			<Skeleton class="h-14 w-14 shrink-0 rounded-full" />

			<div class="w-[90%] space-y-2">
				<Skeleton class="h-4 w-[80%]" />
				<Skeleton class="h-4 w-[60%]" />
			</div>
		</div>
	</div>
</template>
