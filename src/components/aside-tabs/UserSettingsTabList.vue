<script setup lang="ts">
import { Button } from '../ui/button';
import { BellIcon, DatabaseIcon, DoorOpenIcon, LockIcon, PencilIcon, SettingsIcon, } from 'lucide-vue-next';
</script>

<template>
	<div class="bg-white">
		<ul class="p-2 space-y-2">
			<li>
				<Button class="flex gap-4 w-full justify-start p-4 h-auto" variant="ghost">
					<PencilIcon class="size-6 text-gray-500" />
					<span class="text-lg">Edit profile</span>
				</Button>
			</li>

			<li>
				<Button class="flex gap-4 w-full justify-start p-4 h-auto" variant="ghost">
					<BellIcon class="size-6 text-gray-500" />
					<span class="text-lg">Notification</span>
				</Button>
			</li>

			<li>
				<Button class="flex gap-4 w-full justify-start p-4 h-auto" variant="ghost">
					<DatabaseIcon class="size-6 text-gray-500" />
					<span class="text-lg">Data and Storage</span>
				</Button>
			</li>

			<li>
				<Button class="flex gap-4 w-full justify-start p-4 h-auto" variant="ghost">
					<LockIcon class="size-6 text-gray-500" />
					<span class="text-lg">Privacy and Security</span>
				</Button>
			</li>

			<li>
				<Button class="flex gap-4 w-full justify-start p-4 h-auto" variant="ghost">
					<SettingsIcon class="size-6 text-gray-500" />
					<span class="text-lg">General Settings</span>
				</Button>
			</li>

			<li>
				<Button class="flex gap-4 w-full justify-start p-4 h-auto text-red-500 hover:text-red-600" variant="ghost">
					<DoorOpenIcon class="size-6" />
					<span class="text-lg">Log Out</span>
				</Button>
			</li>
		</ul>
	</div>
</template>
