<script setup lang="ts">
import { MailIcon, UserXIcon } from 'lucide-vue-next';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';
import TabTitle from './TabTitle.vue';
</script>
<template>
	<div class="bg-white">
		<div id="user-privacy">
			<div>
				<TabTitle title="Privacy and Security" />

				<div class="p-2">
					<BaseNavigationItem
						label="Blocked Users"
						sublabel="100 users"
						:icon="UserXIcon"
					/>

					<BaseNavigationItem
						label="Login Email"
						sublabel="lorem-pipsum****@gmail.com"
						:icon="MailIcon"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
