<script setup lang="ts">
import ChatWindowFooter from './ChatWindowFooter.vue';
import ChatWindowHeader from './ChatWindowHeader.vue';
import ChatWindowMesseges from './ChatWindowMesseges.vue';
</script>

<template>
	<section class="user__chat flex h-screen w-full flex-col">
		<div class="flex h-full flex-col">
			<ChatWindowHeader />
			<ChatWindowMesseges />
			<ChatWindowFooter />
		</div>
	</section>
</template>
