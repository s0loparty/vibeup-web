<script setup lang="ts">
function getRandomColor() {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
</script>

<template>
	<li
		v-for="num in 30"
		:key="num"
		class="h-33 cursor-pointer"
		:style="{ backgroundColor: getRandomColor() }"
	></li>
</template>
