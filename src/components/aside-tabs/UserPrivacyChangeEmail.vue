<script setup lang="ts">
import { MailboxIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import BaseInput from '../base/BaseInput.vue';
import TabTitle from './TabTitle.vue';

const email = ref<string>('');
</script>

<template>
	<div class="min-h-screen bg-white">
		<div id="user-change-email">
			<div>
				<TabTitle title="Change Email" />
				<div class="flex flex-col items-center justify-center p-5">
					<MailboxIcon class="size-30 fill-gray-300 text-blue-400" />
					<span class="mb-2.5 text-center text-2xl">Enter New Email</span>
					<span class="mb-5 text-center"
						>You will receive an email with a link to change your email.</span
					>
					<form class="w-full space-y-5">
						<BaseInput id="your-email" label="Your Email" v-model="email" />
						<button
							class="block w-full cursor-pointer rounded-lg bg-blue-500 py-2.5 font-semibold text-white"
						>
							Continue
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
