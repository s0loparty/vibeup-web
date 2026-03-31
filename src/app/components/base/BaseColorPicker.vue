<script setup lang="ts">
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/app/components/ui/popover';

const model = defineModel<string>({ required: true });
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<button
				class="flex w-full cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition hover:bg-muted"
			>
				<span
					class="h-5 w-5 rounded border"
					:style="{ backgroundColor: model }"
				/>
				<span class="text-sm">{{ model }}</span>
			</button>
		</PopoverTrigger>

		<PopoverContent class="w-56 space-y-3">
			<input
				type="color"
				v-model="model"
				class="h-10 w-full cursor-pointer rounded border p-1"
			/>
		</PopoverContent>
	</Popover>
</template>
