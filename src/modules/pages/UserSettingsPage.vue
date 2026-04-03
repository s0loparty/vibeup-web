<template>
	<RouterView v-slot="{ Component, route }">
		<KeepAlive>
			<component :is="Component" :key="route.fullPath" />
		</KeepAlive>
	</RouterView>
</template>
