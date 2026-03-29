<script setup lang="ts">
import BaseAvatar from '../base/BaseAvatar.vue';
</script>

<template>
	<li
		class="flex w-full cursor-pointer items-center gap-x-2 rounded-md p-2 transition-colors hover:bg-gray-100"
	>
		<div>
			<BaseAvatar
				src="https://avatars.fastly.steamstatic.com/b26fca93fa06c59914c985d829bd8126390ec1b1_full.jpg"
				name="Заголовок чата / Имя Человека"
			/>
		</div>

		<div class="w-full max-w-full min-w-0">
			<div class="flex items-center justify-between gap-2.5">
				<span class="truncate leading-normal font-semibold text-ellipsis">
					Имя Человека
				</span>
			</div>
		</div>
	</li>
</template>
