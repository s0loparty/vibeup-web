<script setup lang="ts">
import ChatWindowHeader from './ChatWindowHeader.vue';
import ChatWindowMesseges from './ChatWindowMesseges.vue';
import ChatWindowFooter from './ChatWindowFooter.vue';
</script>

<template>
	<section class="user__chat h-screen flex flex-col w-full">
		<div class="flex flex-col h-full">
			<ChatWindowHeader />
			<ChatWindowMesseges />
			<ChatWindowFooter />
		</div>
	</section>
</template>
