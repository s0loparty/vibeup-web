<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import BaseDialog from '../base/BaseDialog.vue';
import BaseInput from '../base/BaseInput.vue';
import BaseNavButton from '../base/BaseNavButton.vue';
import { ScrollArea } from '../ui/scroll-area';
import TabTitle from './TabTitle.vue';
import UserBlockedListItem from './UserBlockedListItem.vue';
import UserProbBlockedList from './UserProbBlockedList.vue';

const searchToBlock = ref<string>('');
</script>

<template>
	<div class="min-h-0 flex-1 overflow-hidden bg-white">
		<div id="user-blocked">
			<div>
				<TabTitle title="Blocked Users" />
				<div class="mb-2.5 bg-gray-300/60 p-4">
					<span class="text-black/50">
						Заблокированые пользователи не могут отпрвлять сообщения или
						добавлять в группу. Они не видят ваш профиль, фото, онлайн - статус
						и т.д.
					</span>
				</div>
				<ScrollArea class="h-screen">
					<ul class="bg-white">
						<UserBlockedListItem v-for="num in 50" :key="num" />
					</ul>
				</ScrollArea>
			</div>
			<BaseDialog>
				<template #trigger>
					<BaseNavButton :icon="PlusIcon" />
				</template>
				<template #title> <div>Block User</div> </template>
				<template #description>
					<div class="min-h-0 overflow-hidden pt-4">
						<BaseInput
							id="block-user"
							v-model="searchToBlock"
							label="User name"
							class="mb-4"
						/>
						<ScrollArea class="h-screen max-h-125 flex-1">
							<ul>
								<UserProbBlockedList v-for="num in 30" :key="num" />
							</ul>
						</ScrollArea>
					</div>
				</template>
			</BaseDialog>
		</div>
	</div>
</template>
