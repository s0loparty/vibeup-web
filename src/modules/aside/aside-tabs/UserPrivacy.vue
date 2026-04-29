<script setup lang="ts">
import BaseNavigationItem from '@/app/components/base/BaseNavigationItem.vue';
import { useAsidePanelStore } from '@/app/stores/useAsidePanelStore';
import { useAuthStore } from '@/app/stores/useAuthStore';
import { MailIcon, UserXIcon } from 'lucide-vue-next';
import TabTitle from './TabTitle.vue';
import UserPrivacyBlacklist from './UserPrivacyBlacklist.vue';
import UserPrivacyChangeEmail from './UserPrivacyChangeEmail.vue';

const authStore = useAuthStore();
const asideStore = useAsidePanelStore();
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
					@click="asideStore.pushLevel(UserPrivacyBlacklist)"
				/>

				<BaseNavigationItem
					label="Login Email"
					:sublabel="authStore.user?.email"
					:icon="MailIcon"
					@click="asideStore.pushLevel(UserPrivacyChangeEmail)"
				/>
			</div>
		</div>
	</div>
</template>
