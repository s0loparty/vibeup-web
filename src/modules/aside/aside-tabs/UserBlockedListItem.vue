<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import type { PublicChat } from '@/shared/api';

defineProps<{
	chat: PublicChat;
}>();
</script>

<template>
	<!-- TODO chat.members[0]?.username у нас будет в приват чатах members всего 1-->
	<!--  из него и будем брать, сейчас данные кривые немного -->
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
				<span class="text-sm text-gray-400">example@kekes.com</span>
			</div>
		</div>
	</li>
</template>
