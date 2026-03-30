<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AtSignIcon, BellIcon, XIcon } from 'lucide-vue-next';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';
</script>

<template>
	<div class="w-sm shrink-0 shadow-bottom">
		<!-- avatar + user info -->
		<div class="relative">
			<div
				class="absolute top-0 right-0 left-0 h-25 bg-linear-to-b from-black/50 to-transparent"
			></div>
			<div class="absolute top-0 flex w-full items-center gap-4 p-2">
				<Button
					variant="ghost"
					class="text-white hover:bg-white/30 hover:text-white"
				>
					<XIcon class="size-6" />
				</Button>
				<span class="text-xl text-white">User Info</span>
			</div>

			<div class="min-h-90.5 w-full bg-brand-400">
				<img
					class="min-h-90.5 w-full object-cover"
					src="https://www.giantbomb.com/a/uploads/scale_super/0/4/175752-shrek.jpg"
					alt=""
				/>
			</div>

			<div
				class="absolute right-4 bottom-4 left-4 flex w-max max-w-[calc(100%-32px)] min-w-37.5 flex-col rounded-md bg-black/50 p-4 backdrop-blur-[2px]"
			>
				<span class="text-lg leading-normal font-semibold text-white">
					Alex Darkstalker 2016
				</span>
				<span class="text-gray-300"> Был(а) в сети в 13:37 </span>
			</div>
		</div>

		<!-- content -->
		<div class="min-h-0 flex-1 overflow-hidden">
			<ScrollArea class="h-full">
				<div class="space-y-4">
					<!-- username & notifications -->
					<div class="bg-white shadow-bottom">
						<ul class="p-2">
							<li>
								<Button
									variant="ghost"
									class="h-auto w-full justify-start gap-4 py-2"
								>
									<AtSignIcon class="size-6 text-gray-600" />
									<div class="flex flex-col items-start">
										<span class="text-base font-normal">s0loparty</span>
										<span class="text-sm font-normal text-gray-500">
											Username
										</span>
									</div>
								</Button>
							</li>
							<li>
								<BaseNavigationItem :icon="BellIcon">
									<div class="flex w-full items-center justify-between">
										<span class="text-base"> Notifications </span>
										<Switch id="groups" />
									</div>
								</BaseNavigationItem>
							</li>
						</ul>
					</div>

					<!-- tabs (media, saved etc) -->
					<div class="bg-white shadow-bottom">
						<Tabs default-value="media" class="p-2">
							<TabsList class="w-full">
								<TabsTrigger value="media"> Media </TabsTrigger>
								<TabsTrigger value="saved"> Pinned </TabsTrigger>
							</TabsList>
							<TabsContent value="media">
								Make changes to your media here.
							</TabsContent>
							<TabsContent value="saved">
								Change your pinned here.
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</ScrollArea>
		</div>
	</div>
</template>
