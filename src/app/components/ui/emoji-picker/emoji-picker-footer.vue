<script setup lang="ts">
import { buttonVariants } from '@/app/components/ui/button';
import { cn } from '@/shared/lib/utils';
import type { HTMLAttributes } from 'vue';
import { default as EmojiPickerPrimitive } from 'vue-frimousse';

interface Props {
	class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
	<div
		:class="
			cn(
				'flex w-full max-w-(--frimousse-viewport-width) min-w-0 items-center gap-1 border-t bg-popover p-2',
				props.class,
			)
		"
		data-slot="emoji-picker-footer"
		v-bind="$attrs"
	>
		<EmojiPickerPrimitive.ActiveEmoji v-slot="{ emoji }">
			<div class="flex w-full items-center justify-between">
				<template v-if="emoji">
					<div class="flex flex-1 items-center gap-1">
						<div
							class="flex size-7 flex-none items-center justify-center text-lg"
						>
							{{ emoji.emoji }}
						</div>
						<span class="truncate text-xs text-secondary-foreground">{{
							emoji.label
						}}</span>
					</div>
				</template>
				<template v-else>
					<span
						class="ml-1.5 flex h-7 items-center truncate text-xs text-muted-foreground"
					>
						Select an emoji…
					</span>
				</template>
				<EmojiPickerPrimitive.SkinToneSelector
					:class="
						cn(
							buttonVariants({ variant: 'secondary', size: 'icon' }),
							'size-7 rounded-md',
						)
					"
					title="Change skin tone"
				/>
			</div>
		</EmojiPickerPrimitive.ActiveEmoji>
	</div>
</template>
