<script setup lang="ts">
import UserSettingsHeader from './UserSettingsHeader.vue';
import UserSettingsTablist from './UserSettingsTabList.vue';
</script>

<template>
	<div class="flex flex-col flex-1 min-h-0 overflow-hidden space-y-3">
		<UserSettingsHeader />
		<UserSettingsTablist />
	</div>
</template>
