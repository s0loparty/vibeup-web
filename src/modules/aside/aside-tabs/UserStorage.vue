<script setup lang="ts">
import BaseNavigationItem from '@/app/components/base/BaseNavigationItem.vue';
import { TrashIcon } from 'lucide-vue-next';
import TabTitle from './TabTitle.vue';
</script>

<template>
	<div class="h-screen bg-white">
		<div id="user-storage">
			<div>
				<TabTitle title="Data and Storage" />

				<div class="p-2">
					<div class="flex justify-between p-3">
						<span>Cache Size: </span>
						<span class="text-sm text-gray-500">100 MB</span>
					</div>

					<BaseNavigationItem
						label="Clear All"
						:icon="TrashIcon"
						class="text-brand-400 hover:text-brand-500"
						label-class="text-brand-400 group-hover:text-brand-500"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
