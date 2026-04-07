<script setup lang="ts">
import BaseFormInput from '@/app/components/base/form/BaseFormInput.vue';
import { Button } from '@/app/components/ui/button';
import { useRegisterMutation } from '@/app/query/auth/useRegisterMutation';
import { registerSchema } from '@/app/utils/validations/auth/register';
import logo from '@/assets/logo.webp';
import { useForm } from 'vee-validate';

const { mutate: regsiter, isPending } = useRegisterMutation();

function onRegister() {
	regsiter({
		email: email.value,
		password: password.value,
	});
}

const { defineField } = useForm({
	validationSchema: registerSchema,
});
const [email] = defineField('email');
const [password] = defineField('password');
</script>

<template>
	<div class="w-full max-w-100 px-4 pt-[10dvh]">
		<img :src="logo" alt="" class="mx-auto mb-5 w-40" />

		<div class="rounded-lg bg-white p-4 shadow-lg">
			<h6 class="mb-5 text-center text-2xl font-semibold">Регистрация</h6>
			<form @submit.prevent="onRegister" class="space-y-5">
				<BaseFormInput v-model="email" name="email" label="Email" />
				<BaseFormInput v-model="password" name="password" label="Password" />
				<Button
					:is-loading="isPending"
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
