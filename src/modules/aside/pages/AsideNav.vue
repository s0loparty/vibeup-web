<script setup lang="ts"></script>

<template>
	<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
	<aside
		class="relative z-6 flex h-screen max-w-105 min-w-105 flex-col overflow-hidden bg-accent max-[925px]:hidden"
	>
		<RouterView />
	</aside>
</template>
