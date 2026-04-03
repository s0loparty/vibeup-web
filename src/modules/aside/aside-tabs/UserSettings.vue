<script setup lang="ts">
import UserSettingsHeader from './UserSettingsHeader.vue';
</script>

<template>
	<div class="flex min-h-0 flex-1 flex-col space-y-3 overflow-hidden">
		<UserSettingsHeader />

		<RouterView v-slot="{ Component }">
			<Transition name="fade"> <component :is="Component" /> </Transition>
		</RouterView>
	</div>
</template>
