<script setup lang="ts">
import BaseNavigationItem from '@/app/components/base/BaseNavigationItem.vue';
import { Switch } from '@/app/components/ui/switch';
import TabTitle from './TabTitle.vue';
</script>

<template>
	<div class="h-full bg-white">
		<div id="user-notify">
			<TabTitle title="Notifications" />

			<div class="p-2">
				<BaseNavigationItem
					as="label"
					for="privateChat"
					class="justify-between text-black hover:text-black"
				>
					<span class="text-base"> Notifications for private chats </span>
					<Switch id="privateChat" />
				</BaseNavigationItem>
				<BaseNavigationItem
					as="label"
					for="groups"
					class="justify-between text-black hover:text-black"
				>
					<span class="text-base"> Notifications for groups </span>
					<Switch id="groups" />
				</BaseNavigationItem>
			</div>
		</div>
	</div>
</template>
