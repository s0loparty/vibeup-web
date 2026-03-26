<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
	SwitchRoot,
	SwitchThumb,
	useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes["class"] }>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
	<SwitchRoot v-slot="slotProps" data-slot="switch" v-bind="forwarded" :class="cn(
		'cursor-pointer peer data-[state=checked]:bg-blue-400 data-[state=unchecked]:bg-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[0.8rem] w-8.5 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
		props.class,
	)">
		<SwitchThumb data-slot="switch-thumb"
			:class="cn('bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-5 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-[calc(0%-2px)] data-[state=unchecked]:border-gray-300 data-[state=checked]:border-blue-400 border-2')">
			<slot name="thumb" v-bind="slotProps" />
		</SwitchThumb>
	</SwitchRoot>
</template>
