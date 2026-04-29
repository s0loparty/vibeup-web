<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/app/components/ui/context-menu';
import { useAuthStore } from '@/app/stores/useAuthStore';
import type { PublicMessage } from '@/shared/api';
import { CopyIcon, PinIcon, ReplyIcon, TrashIcon } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
	message: PublicMessage;
}>();

const authStore = useAuthStore();

const isOwner = computed(() => {
	return authStore.user?.id === props.message.sender_id;
});

const avatarName = computed(() => {
	return props.message.sender?.username;
});
</script>

<template>
	<ContextMenu>
		<ContextMenuTrigger as="div">
			<div
				class="message-group flex"
				:class="isOwner ? 'justify-end' : 'justify-start'"
			>
				<div class="mr-1.25 flex items-end">
					<BaseAvatar
						v-if="!isOwner"
						class="bg-gray-500/50 text-sm text-white"
						:src="message.sender?.avatar?.thumbnail"
						:name="avatarName"
					/>
				</div>

				<div
					class="message max-w-[90%] rounded-md p-2.5 md:max-w-[70%]"
					:class="
						isOwner ? 'bg-brand-500 text-white' : 'bg-white text-gray-800'
					"
					style="box-shadow: 0 1px 2px #10232f26"
				>
					<div>
						{{ props.message.body }}
						<div class="text-right text-xs">{{ props.message.created_at }}</div>
					</div>
				</div>
			</div>
		</ContextMenuTrigger>
		<ContextMenuContent class="w-25 bg-white/95">
			<ContextMenuItem>
				<ReplyIcon />
				Reply
			</ContextMenuItem>
			<ContextMenuItem>
				<CopyIcon />
				Copy
			</ContextMenuItem>
			<ContextMenuItem>
				<PinIcon />
				Pin
			</ContextMenuItem>
			<ContextMenuItem>
				<TrashIcon />
				Delete
			</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
</template>
