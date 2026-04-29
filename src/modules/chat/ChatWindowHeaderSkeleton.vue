<script setup lang="ts">
import { Skeleton } from '@/app/components/ui/skeleton';
</script>

<template>
	<div
		id="user-chat-header"
		class="relative z-5 flex h-14 shrink-0 items-center bg-white px-4"
	>
		<div class="flex w-full items-center justify-between gap-4">
			<!-- Left section: Avatar and text -->
			<div class="flex min-w-0 flex-1 items-center gap-3">
				<Skeleton class="size-10 shrink-0 rounded-full" />

				<div class="flex min-w-0 flex-1 flex-col gap-1.5">
					<Skeleton class="h-4 w-3/4 max-w-50" />
					<Skeleton class="h-3 w-1/2 max-w-35" />
				</div>
			</div>

			<!-- Right section: Action buttons -->
			<div class="flex shrink-0 items-center gap-3">
				<Skeleton class="size-5 rounded-md" />
				<Skeleton class="size-5 rounded-md" />
				<Skeleton class="size-5 rounded-md" />
			</div>
		</div>
	</div>
</template>
