<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next';
import { Button } from '../ui/button';

const { title } = defineProps<{ title: string }>();
</script>

<template>
	<div class="flex w-full items-center gap-4 px-2 py-2.5">
		<Button variant="ghost" class="text-gray-600" @click="$router.back()">
			<ArrowLeftIcon class="size-6" />
		</Button>
		<span class="text-xl font-bold">{{ title }}</span>
	</div>
</template>
