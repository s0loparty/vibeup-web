<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import { useTransformDate } from '@/app/composables/useTransformDate';
import type { PublicChat } from '@/shared/api';
defineProps<{
	chat: PublicChat;
}>();
const { dateOrHours } = useTransformDate();
</script>

<template>
	<li
		class="flex w-full cursor-pointer items-center gap-x-2 rounded-md p-2 transition-colors hover:bg-gray-100"
	>
		<div>
			<BaseAvatar
				class="bg-gray-500/50 text-sm text-white"
				:src="chat.members[0]?.avatar?.thumbnail"
				:name="chat.members[0]?.username"
			/>
		</div>

		<div class="w-full max-w-full min-w-0">
			<div class="flex flex-col justify-center gap-1.25">
				<span class="truncate leading-normal font-semibold text-ellipsis">
					{{ chat.members[0]?.username }}
				</span>
				<div class="flex items-center justify-between">
					<span class="text-sm text-gray-400">example@kekes.com</span>
					<span class="text-sm text-gray-400">{{
						dateOrHours(chat.members[0]?.last_seen_at!)
					}}</span>
				</div>
			</div>
		</div>
	</li>
</template>
