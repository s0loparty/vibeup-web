<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useAttrs } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {
	src: string;
	name: string;
};

const { name, src } = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
	<Avatar :class="cn('size-14', attrs.class)">
		<AvatarImage :src :alt="name" />
		<AvatarFallback>{{ name }}</AvatarFallback>
	</Avatar>
</template>
