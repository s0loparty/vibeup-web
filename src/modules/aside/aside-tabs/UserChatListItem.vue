<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import type { Chat } from '@/shared/api';
import UserChatListMessagePin from './UserChatListMessagePin.vue';
import UserChatListMessagesCount from './UserChatListMessagesCount.vue';

function getRandomIntegerInclusive(min: number, max: number) {
	min = Math.ceil(min); // Ensure min is treated as an integer
	max = Math.floor(max); // Ensure max is treated as an integer
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const countMessages = getRandomIntegerInclusive(1, 150);

const fiftyFifty = Math.random() < 0.5;

defineProps<{
	chat: Chat;
}>();
</script>

<template>
	<li
		class="flex w-full cursor-pointer items-center gap-x-2 rounded-md p-2 transition-colors hover:bg-gray-100"
	>
		<div>
			<!--TODO: Аватар если есть если нету то юзер заглушка картинка-->
			<BaseAvatar
				src="https://avatars.fastly.steamstatic.com/b26fca93fa06c59914c985d829bd8126390ec1b1_full.jpg"
				:name="chat.display_title"
			/>
		</div>

		<div class="w-full max-w-full min-w-0">
			<div class="flex items-center justify-between gap-2.5">
				<span class="truncate leading-normal font-semibold text-ellipsis">
					{{ chat.display_title }}
				</span>
				<span v-if="chat.last_message" class="shrink-0 text-sm text-gray-400">
					{{ chat.last_message.updated_at }}
				</span>
			</div>
			<div class="flex flex-nowrap justify-between gap-x-2">
				<p class="truncate text-sm leading-normal text-ellipsis text-gray-400">
					{{ chat.last_message?.body || chat.display_title }}
				</p>

				<div class="flex items-center gap-x-2">
					<!-- count not read messages -->
					<UserChatListMessagesCount
						v-if="fiftyFifty"
						:count="countMessages"
						notify-enable
					/>
					<UserChatListMessagesCount
						v-else
						:count="countMessages"
						:notify-enable="false"
					/>

					<!-- if chat Pin -->
					<!-- TODO: зекрепы всегда сверху в списке чатов -->
					<UserChatListMessagePin v-if="fiftyFifty" />
				</div>
			</div>
		</div>
	</li>
</template>
