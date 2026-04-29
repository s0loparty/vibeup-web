<script setup lang="ts">
import BaseInput from '@/app/components/base/BaseInput.vue';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useAsidePanelStore } from '@/app/stores/useAsidePanelStore';
import { ArrowRight } from 'lucide-vue-next';
import { ref } from 'vue';
import TabTitle from './TabTitle.vue';
import UserChatCreateGroupListItem from './UserChatCreateGroupListItem.vue';
import UserChatCreateGroupSettings from './UserChatCreateGroupSettings.vue';

const selectedUsers = ref(new Set());
const groupSearch = ref<string>('');

function checkedHandler(id: number) {
	if (selectedUsers.value.has(id)) {
		selectedUsers.value.delete(id);
	} else {
		selectedUsers.value.add(id);
	}
}

const panelStore = useAsidePanelStore();
</script>

<template>
	<div class="min-h-0 flex-1 overflow-hidden bg-white">
		<div class="flex h-full flex-col">
			<TabTitle title="Новый групповой чат" />
			<!--TODO: когда у нас будут списки юзеров
			уже будем подставлять валидные данные и сюда
			сделаем красивую карточку заполняя данными по конкретному юзеру через айди
			-->
			<div class="mx-auto">
				{{ [...selectedUsers.values()].map((el) => el).toString() }}
			</div>

			<div class="mb-2.5 bg-white p-4">
				<BaseInput id="create-private" label="Найти" v-model="groupSearch" />
			</div>

			<div class="relative flex-1 overflow-hidden">
				<ScrollArea class="h-full">
					<ul class="bg-white pb-20">
						<!--TODO когда список юзеров уже будет актуальный будем передавать сюда список
						этих юзеров для заполнения шаблона
						-->
						<UserChatCreateGroupListItem
							v-for="(num, idx) in 50"
							:id="idx"
							:key="num"
							@checked="checkedHandler"
						/>
					</ul>
				</ScrollArea>

				<div class="absolute right-3.75 bottom-3.75">
					<button
						class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-brand-500 shadow-[0_0_10px_0_rgba(0,0,0,0.3)]"
						@click="panelStore.pushLevel(UserChatCreateGroupSettings)"
					>
						<ArrowRight class="text-white" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
