import type { User } from '@/shared/api';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, shallowRef } from 'vue';
import { AUTH_TOKEN } from '../constants/auth';

export const useAuthStore = defineStore('auth', () => {
	const token = useLocalStorage(AUTH_TOKEN, '');
	const user = shallowRef<User | null>(null);

	const isAuthenticated = computed(() => {
		return token.value.length > 0;
	});

	function setToken(newToken: string) {
		token.value = newToken;
	}

	function setUser(newUser: User) {
		user.value = newUser;
	}

	function reset() {
		token.value = '';
		user.value = null;
	}

	return { token, user, isAuthenticated, setToken, setUser, reset };
});
