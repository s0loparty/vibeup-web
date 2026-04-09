import type { User } from '@/shared/api';
import { useLocalStorage } from '@vueuse/core';
import { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { AUTH_TOKEN } from '../constants/auth';

export const useAuthStore = defineStore('auth', () => {
	const token = useLocalStorage(AUTH_TOKEN, '');
	const { data: user } = useIDBKeyval<User | null>('user-store', null);

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
