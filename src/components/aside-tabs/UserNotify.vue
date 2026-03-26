<script setup lang="ts">
import { Button } from '../ui/button';
import { ArrowLeftIcon } from 'lucide-vue-next';
import { Switch } from '@/components/ui/switch'
</script>

<template>
	<div class="bg-white">
		<div id="user-notify">
			<div>
				<div class="flex items-center gap-4 w-full py-2">
					<Button variant="ghost">
						<ArrowLeftIcon class="size-6" />
					</Button>
					<span class="font-bold text-xl">Notifications</span>
				</div>
				<ul class="p-2">
					<li>
						<Button class="flex gap-4 w-full justify-between p-4 h-auto" variant="ghost">
							<span class="text-lg">Notifications for private chats</span>
							<Switch />
						</Button>
					</li>
					<li>
						<Button class="flex gap-4 w-full justify-between p-4 h-auto" variant="ghost">
							<span class="text-lg">Notifications for groups</span>
							<Switch />
						</Button>
					</li>
					<li>
						<Button class="flex gap-4 w-full justify-between p-4 h-auto" variant="ghost">
							<span class="text-lg">Notifications for channels</span>
							<Switch />
						</Button>
					</li>
				</ul>
			</div>
		</div>


	</div>
</template>
