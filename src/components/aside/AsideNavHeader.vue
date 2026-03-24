<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { MenuIcon, } from 'lucide-vue-next';
</script>

<template>
	<div class="flex justify-between items-center p-2.5 gap-2.5">
		<Button variant="ghost" size="icon" class="p-0">
			<MenuIcon class="size-6 text-gray-500" />
		</Button>
		<input type="text" placeholder="search_user" class="w-full bg-gray-200 rounded-[20px] px-3 py-3" />
	</div>
</template>
