<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import { ref } from 'vue';

// type userInfo = {
// 	id: number;
// 	name: string;
// 	email: string;
// 	avatar: {
// 		original: string;
// 		thumbnail: string;
// 	};
// };

//props будет ожидать юзера, потом когда список готов будет
const props = defineProps<{
	id: number;
}>();

const emit = defineEmits<{
	(e: 'checked', value: number): void;
}>();

const model = ref(false);

function toggleCheckbox() {
	model.value = !model.value;
	emit('checked', props.id);
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
				src="https://avatars.fastly.steamstatic.com/b26fca93fa06c59914c985d829bd8126390ec1b1_full.jpg"
				name="Заголовок чата / Имя Человека"
			/>
		</div>

		<div class="w-full max-w-full min-w-0">
			<div class="flex flex-col justify-center gap-1.25">
				<span class="truncate leading-normal font-semibold text-ellipsis">
					Имя Человека
				</span>
				<span class="text-sm text-gray-400">Nick Name</span>
			</div>
		</div>
	</li>
</template>
