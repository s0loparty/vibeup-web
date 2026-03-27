<script setup lang="ts">
import { Switch } from '@/components/ui/switch';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';
import TabTitle from './TabTitle.vue';
</script>

<template>
	<div class="bg-white">
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
				<BaseNavigationItem
					as="label"
					for="channels"
					class="justify-between text-black hover:text-black"
				>
					<span class="text-base"> Notifications for channels </span>
					<Switch id="channels" />
				</BaseNavigationItem>
			</div>
		</div>
	</div>
</template>
