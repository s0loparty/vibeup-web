<script setup lang="ts">
import { Button } from '../ui/button';
import { ArrowLeftIcon, UserXIcon, MailIcon, } from 'lucide-vue-next';
</script>
<template>
	<div class="bg-white">
		<div id="user-privacy">
			<div>
				<div class="flex items-center gap-4 w-full py-2">
					<Button variant="ghost">
						<ArrowLeftIcon class="size-6" />
					</Button>
					<span class="font-bold text-xl">Privacy and Security</span>
				</div>
				<div class="p-2">
					<Button class="flex gap-4 w-full justify-start p-4 h-auto" variant="ghost">
						<UserXIcon class="size-6 text-gray-500" />
						<div class="flex flex-col items-start">
							<span class="text-lg">Blocked Users</span>
							<span class="text-gray-500 text-sm">100 users</span>
						</div>
					</Button>
					<Button class="flex gap-4 w-full justify-start p-4 h-auto" variant="ghost">
						<MailIcon class="size-6 text-gray-500" />
						<div class="flex flex-col items-start">
							<span class="text-lg">Login Email</span>
							<span class="text-gray-500 text-sm">lorem-pipsum****@gmail.com</span>
						</div>
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>
