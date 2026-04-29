<script setup lang="ts">
import { cn } from '@/shared/lib/utils';
import { computed, useAttrs } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {
	src?: string | null;
	name?: string;
};

const { name, src } = defineProps<Props>();
const attrs = useAttrs();

const initials = computed(() => {
	if (!name) return '';

	const parts = name.trim().split(/\s+/);

	if (parts.length === 0) return '';

	const firstInitial = parts[0]?.[0]?.toUpperCase() || '';
	const secondInitial = parts[1]?.[0]?.toUpperCase() || '';

	return secondInitial ? `${firstInitial}${secondInitial}` : firstInitial;
});
</script>

<template>
	<Avatar :class="cn('size-14 shadow-md', attrs.class)">
		<AvatarImage v-if="src" :src :alt="name" />
		<AvatarFallback v-bind="attrs">{{ initials || '@' }}</AvatarFallback>
	</Avatar>
</template>
