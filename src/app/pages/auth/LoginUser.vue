<script setup lang="ts">
import BaseInput from '@/app/components/base/BaseInput.vue';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { useLoginMutation } from '@/app/query/auth/useLoginMutation';
import logo from '@/assets/logo.webp';
import { ref } from 'vue';

const { mutate: login, isPending } = useLoginMutation();

const email = ref('');
const password = ref('');

function onLogin() {
	login({ email: email.value, password: password.value });
}
</script>

<template>
	<div class="w-full max-w-100 px-4 pt-[10dvh]">
		<img :src="logo" alt="" class="mx-auto mb-5 w-40" />

		<div class="rounded-lg bg-white p-4 shadow-lg">
			<h6 class="mb-5 text-center text-2xl font-semibold">Вход в аккаунт</h6>
			<form class="space-y-5" @submit.prevent="onLogin">
				<BaseInput v-model="email" id="email" label="Email" />
				<BaseInput v-model="password" id="password" label="Password" />
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2.5">
						<Checkbox id="remember" />
						<Label class="text-sm" for="remember"> Запомнить меня</Label>
					</div>
					<a class="text-sm text-brand-400 hover:text-brand-500" href="#">
						Забыли пароль?
					</a>
				</div>
				<Button
					:is-loading="isPending"
					class="h-12 w-full bg-brand-500 text-base text-white transition-colors hover:bg-brand-600"
					variant="secondary"
				>
					Войти
				</Button>
				<hr />
				<div class="flex justify-center gap-2.5">
					<span class="text-sm">Нет аккаунта?</span>
					<RouterLink
						:to="{ name: 'auth:register' }"
						class="text-sm text-brand-400 hover:text-brand-500"
					>
						Зарегистрироваться
					</RouterLink>
				</div>
			</form>
		</div>
	</div>
</template>
