<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog';

type Slots = {
	trigger: () => void;
	title?: () => void;
	description: () => void;
};

const slots = defineSlots<Slots>();
</script>

<template>
	<Dialog>
		<DialogTrigger>
			<slot name="trigger"></slot>
		</DialogTrigger>
		<DialogContent class="p-4">
			<DialogHeader>
				<DialogTitle v-if="slots.title">
					<slot name="title"></slot>
				</DialogTitle>
				<DialogDescription>
					<slot name="description"></slot>
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	</Dialog>
</template>
