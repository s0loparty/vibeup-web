import { defineStore } from 'pinia';
import { computed, markRaw, ref, type Component } from 'vue';

export type AsidePanelType =
	| 'settings'
	| 'create-group'
	| 'create-private'
	| null;

interface PanelLevel {
	component: Component;
	level: number | Date;
}

export const useAsidePanelStore = defineStore('asidePanel', () => {
	const activePanel = ref<AsidePanelType>(null);
	const navigationStack = ref<PanelLevel[]>([]);
	const animationDirection = ref<'forward' | 'back'>('forward');

	const currentLevel = computed(
		() => navigationStack.value[navigationStack.value.length - 1] || null,
	);

	function openPanel(panel: AsidePanelType, initialComponent: Component) {
		activePanel.value = panel;
		animationDirection.value = 'forward';
		navigationStack.value = [
			{
				component: markRaw(initialComponent),
				level: Date.now(),
			},
		];
	}

	function pushLevel(component: Component) {
		if (!activePanel.value) return;

		animationDirection.value = 'forward';
		navigationStack.value.push({
			component: markRaw(component),
			level: Date.now(),
		});
	}

	function goBack() {
		if (navigationStack.value.length > 1) {
			animationDirection.value = 'back';
			navigationStack.value.pop();
		} else {
			closePanel();
		}
	}

	function closePanel() {
		activePanel.value = null;
		navigationStack.value = [];
	}

	return {
		animationDirection,
		activePanel,
		navigationStack,
		currentLevel,
		openPanel,
		pushLevel,
		goBack,
		closePanel,
	};
});
