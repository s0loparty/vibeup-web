<script setup lang="ts">
import BaseNavigationItem from '@/app/components/base/BaseNavigationItem.vue';
import { MailIcon, UserXIcon } from 'lucide-vue-next';
import TabTitle from './TabTitle.vue';
</script>
<template>
	<div class="h-screen bg-white">
		<div id="user-privacy">
			<div v-if="$route.name === 'settings:privacy'">
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
						sublabel="lorem-pipsum****@gmail.com"
						:icon="MailIcon"
						@click="$router.push({ name: 'settings:privacy:change-email' })"
					/>
				</div>
			</div>

			<RouterView v-slot="{ Component }" v-else>
				<component :is="Component" />
			</RouterView>
		</div>
	</div>
</template>
