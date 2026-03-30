<script setup lang="ts">
import logo from '@/assets/logo.webp';
import BaseInput from '@/components/base/BaseInput.vue';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
</script>

<template>
	<div class="w-full max-w-100 px-4 pt-[10dvh]">
		<img :src="logo" alt="" class="mx-auto mb-5 w-40" />

		<div class="rounded-lg bg-white p-4 shadow-lg">
			<h6 class="mb-5 text-center text-2xl font-semibold">Регистрация</h6>
			<form class="space-y-5">
				<BaseInput v-model="email" id="email" label="Email" />
				<BaseInput v-model="password" id="password" label="Password" />
				<Button
					class="h-12 w-full bg-brand-500 text-base text-white transition-colors hover:bg-brand-600"
					variant="secondary"
				>
					Зарегистрироваться
				</Button>
				<hr />
				<div class="flex justify-center gap-2.5">
					<span class="text-sm">Есть аккаунт?</span>
					<RouterLink
						:to="{ name: 'auth:login' }"
						class="text-sm text-brand-400 hover:text-brand-500"
					>
						Войти
					</RouterLink>
				</div>
			</form>
		</div>
	</div>
</template>
