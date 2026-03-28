<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import BaseInput from '@/components/base/BaseInput.vue';
import { Label } from '@/components/ui/label';
const email = ref<string>('')
const password = ref<string>('')
</script>

<template>
	<div class="w-full max-w-100 pt-[20dvh] px-4">
		<div class="bg-white p-4 rounded-lg shadow-lg">
			<h6 class="text-center text-2xl mb-5">Вход в аккаунт</h6>
			<form class="space-y-5">
				<BaseInput v-model="email" id="email" label="Email" />
				<BaseInput v-model="password" id="password" label="Password" />
				<div class="flex justify-between items-center">
					<div class="flex gap-2.5 items-center">
						<Checkbox id="remember" type="checkbox" />
						<Label class="text-sm" for="remember"> Запомнить меня</Label>
					</div>
					<a class="text-blue-400 text-sm" href="#">Забыли пароль?</a>
				</div>
				<button
					class="block w-full bg-blue-500 text-white py-2.5 rounded-lg font-semibold cursor-pointer">Войти</button>
				<hr>
				<div class="flex justify-center gap-2.5">
					<span class="text-sm">Нет аккаунта?</span>
					<a class="text-blue-400 text-sm" href="#">Зарегистрироваться</a>
				</div>
			</form>
		</div>
	</div>
</template>
