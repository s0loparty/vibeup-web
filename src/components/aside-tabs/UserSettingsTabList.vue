<script setup lang="ts">
import {
	BellIcon,
	DatabaseIcon,
	DoorOpenIcon,
	LockIcon,
	PencilIcon,
	SettingsIcon,
} from 'lucide-vue-next';
import { ScrollArea } from '../ui/scroll-area';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';
</script>

<template>
	<div class="app-shadow bg-white flex-1 overflow-hidden min-h-0">
		<ScrollArea class="h-full">
			<ul class="p-2">
				<li>
					<BaseNavigationItem label="Edit profile" :icon="PencilIcon" />
				</li>

				<li>
					<BaseNavigationItem label="Notification" :icon="BellIcon" />
				</li>

				<li>
					<BaseNavigationItem label="Data and Storage" :icon="DatabaseIcon" />
				</li>

				<li>
					<BaseNavigationItem label="Privacy and Security" :icon="LockIcon" />
				</li>

				<li>
					<BaseNavigationItem label="General Settings" :icon="SettingsIcon" />
				</li>

				<li>
					<BaseNavigationItem label="Log Out" :icon="DoorOpenIcon"
						class="text-red-500 hover:bg-red-100/50 hover:text-red-600" label-class="text-inherit" />
				</li>
			</ul>
		</ScrollArea>
	</div>
</template>
