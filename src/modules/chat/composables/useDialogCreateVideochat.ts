import { ref } from 'vue';

export function useDialogCreateVideochat() {
	const showDialogCreateVideochat = ref(false);

	return { showDialogCreateVideochat };
}
