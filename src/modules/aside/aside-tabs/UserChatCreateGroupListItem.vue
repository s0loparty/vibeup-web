<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import type { PublicChat } from '@/shared/api';
import { ref } from 'vue';

// TODO пока что members[0] когда апи поправим будет конкретный юзер без всяких members[0];
const props = defineProps<{
	chat: PublicChat;
}>();

const emit = defineEmits<{
	(e: 'checked', value: number): void;
}>();

const model = ref(false);

function toggleCheckbox() {
	model.value = !model.value;
	emit('checked', props.chat.members[0]?.id!);
}
</script>

<template>
	<li
		@click="toggleCheckbox"
		class="flex w-full cursor-pointer items-center gap-x-2.5 rounded-md p-2 transition-colors hover:bg-gray-100"
	>
		<input class="size-5 rounded-[5px]" type="checkbox" v-model="model" />

		<div>
			<BaseAvatar
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
