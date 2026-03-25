<script setup lang="ts">
import AsideNavHeader from './AsideNavHeader.vue';
import AsideNavChatlist from './AsideNavChatlist.vue';
import AsideNavButtonCreate from './AsideNavButtonCreate.vue';
</script>

<template>
	<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
	<aside class="bg-white min-w-105 relative flex flex-col h-screen max-[925px]:hidden app-shadow  z-6">
		<AsideNavHeader />
		<AsideNavChatlist />
		<AsideNavButtonCreate />
	</aside>
</template>
