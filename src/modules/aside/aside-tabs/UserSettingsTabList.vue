<script setup lang="ts">
import BaseNavigationItem from '@/app/components/base/BaseNavigationItem.vue';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useLogoutMutation } from '@/app/query/auth/useLogoutMutation';
import {
	BellIcon,
	DatabaseIcon,
	DoorOpenIcon,
	LockIcon,
	PencilIcon,
	SettingsIcon,
} from 'lucide-vue-next';
import UserSettingsHeader from './UserSettingsHeader.vue';

const { mutate: logout } = useLogoutMutation();
</script>

<template>
	<div class="flex min-h-0 flex-1 flex-col space-y-3 overflow-hidden">
		<UserSettingsHeader />

		<div class="min-h-0 flex-1 overflow-hidden bg-white shadow-box">
			<ScrollArea class="h-full">
				<ul class="p-2">
					<li>
						<BaseNavigationItem
							label="Edit profile"
							:icon="PencilIcon"
							@click="$router.push({ name: 'settings:profile-edit' })"
						/>
					</li>

					<li>
						<BaseNavigationItem
							label="Notification"
							:icon="BellIcon"
							@click="$router.push({ name: 'settings:notify' })"
						/>
					</li>

					<li>
						<BaseNavigationItem
							label="Data and Storage"
							:icon="DatabaseIcon"
							@click="$router.push({ name: 'settings:storage' })"
						/>
					</li>

					<li>
						<BaseNavigationItem
							label="Privacy and Security"
							:icon="LockIcon"
							@click="$router.push({ name: 'settings:privacy' })"
						/>
					</li>

					<li>
						<BaseNavigationItem
							label="General Settings"
							:icon="SettingsIcon"
							@click="$router.push({ name: 'settings:general' })"
						/>
					</li>

					<li>
						<BaseNavigationItem
							label="Log Out"
							:icon="DoorOpenIcon"
							class="text-red-500 hover:bg-red-100/50 hover:text-red-600"
							label-class="text-inherit"
							@click="logout"
						/>
					</li>
				</ul>
			</ScrollArea>
		</div>
	</div>
</template>
