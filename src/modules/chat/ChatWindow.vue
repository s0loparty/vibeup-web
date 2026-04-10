<script setup lang="ts">
import ChatWindowFooter from './ChatWindowFooter.vue';
import ChatWindowHeader from './ChatWindowHeader.vue';
import ChatWindowMessages from './ChatWindowMessages.vue';
import ChatWindowWallpaper from './ChatWindowWallpaper.vue';
</script>

<template>
	<section
		class="user__chat box-r flex h-screen w-full flex-col border-r border-gray-200/50"
	>
		<div class="flex h-full flex-col">
			<ChatWindowWallpaper />
			<ChatWindowHeader />
			<ChatWindowMessages />
			<ChatWindowFooter />
		</div>
	</section>
</template>
