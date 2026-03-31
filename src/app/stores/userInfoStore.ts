import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserInfoStore = defineStore('userInfo', () => {
	const showPanel = ref(false);

	return { showPanel };
});
