<script setup lang="ts">
import BaseNavigationItem from '@/app/components/base/BaseNavigationItem.vue';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { MailIcon, UserXIcon } from 'lucide-vue-next';
import TabTitle from './TabTitle.vue';

const authStore = useAuthStore();
</script>

<template>
	<div class="h-screen bg-white">
		<div id="user-privacy">
			<TabTitle title="Privacy and Security" />

			<div class="p-2">
				<BaseNavigationItem
					label="Blocked Users"
					sublabel="100 users"
					:icon="UserXIcon"
					@click="$router.push({ name: 'settings:privacy:blacklist' })"
				/>

				<BaseNavigationItem
					label="Login Email"
					:sublabel="authStore.user?.email"
					:icon="MailIcon"
					@click="$router.push({ name: 'settings:privacy:change-email' })"
				/>
			</div>
		</div>
	</div>
</template>
