<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue';
import { ref } from 'vue';
const email = ref<string>('');
const password = ref<string>('');
</script>

<template>
	<div class="w-full max-w-100 px-4 pt-[20dvh]">
		<div class="rounded-lg bg-white p-4 shadow-lg">
			<h6 class="mb-5 text-center text-2xl">Регистрация</h6>
			<form class="space-y-5">
				<BaseInput v-model="email" id="email" label="Email" />
				<BaseInput v-model="password" id="password" label="Password" />
				<button
					class="block w-full cursor-pointer rounded-lg bg-blue-500 py-2.5 font-semibold text-white"
				>
					Зарегистрироваться
				</button>
				<hr />
				<div class="flex justify-center gap-2.5">
					<span class="text-sm">Есть аккаунт?</span>
					<a class="text-sm text-blue-400" href="#">Войти</a>
				</div>
			</form>
		</div>
	</div>
</template>
