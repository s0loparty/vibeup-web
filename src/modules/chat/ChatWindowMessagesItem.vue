<script setup lang="ts">
import BaseAvatar from '@/app/components/base/BaseAvatar.vue';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/app/components/ui/context-menu';
import { CopyIcon, PinIcon, ReplyIcon, TrashIcon } from 'lucide-vue-next';

defineProps<{
	index: number;
}>();
</script>

<template>
	<ContextMenu>
		<ContextMenuTrigger as="div">
			<div
				class="message-group flex"
				:class="index % 2 === 0 ? 'justify-end' : 'justify-start'"
			>
				<div class="mr-1.25 flex items-end">
					<BaseAvatar
						v-if="index % 2 !== 0"
						class="siz-2"
						src="https://i.pinimg.com/originals/5b/18/9d/5b189ddbad90269952a0ca4b20634ec6.jpg"
						name="avatar"
					/>
				</div>

				<div
					class="message max-w-[90%] rounded-md p-2.5 md:max-w-[70%]"
					:class="
						index % 2 === 0
							? 'bg-brand-500 text-white'
							: 'bg-white text-gray-800'
					"
					style="box-shadow: 0 1px 2px #10232f26"
				>
					<div>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
						perferendis facere dolore deserunt sunt eveniet voluptatem dolores
						nisi id unde amet obcaecati sapiente soluta quo odit atque natus, et
						numquam.
						<div class="text-right text-xs">15:52</div>
					</div>
				</div>
			</div>
		</ContextMenuTrigger>
		<ContextMenuContent class="w-25">
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
