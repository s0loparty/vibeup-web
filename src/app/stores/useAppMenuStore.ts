import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppMenuStore = defineStore('appMenu', () => {
	const showUserInfo = ref(false);
	const showAside = ref(true);

	return { showUserInfo, showAside };
});
