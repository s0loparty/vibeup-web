<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AtSignIcon, BellIcon } from 'lucide-vue-next';
</script>

<template>
	<div class="app-shadow w-sm shrink-0">
		<!-- avatar + user info -->
		<div class="relative">
			<img
				class="min-h-90.5 w-full object-cover"
				src="https://www.giantbomb.com/a/uploads/scale_super/0/4/175752-shrek.jpg"
				alt=""
			/>

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
					<div class="app-shadow bg-white">
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
								<Button
									variant="ghost"
									class="h-auto w-full justify-start gap-4 py-2"
								>
									<BellIcon class="size-6 text-gray-600" />
									<span class="text-base font-normal">Notifications</span>

									<span class="ml-auto font-normal">switch here</span>
								</Button>
							</li>
						</ul>
					</div>

					<!-- tabs (media, saved etc) -->
					<div class="app-shadow bg-white">
						<Tabs default-value="media" class="p-2">
							<TabsList class="w-full">
								<TabsTrigger value="media"> Media </TabsTrigger>
								<TabsTrigger value="saved"> Saved </TabsTrigger>
							</TabsList>
							<TabsContent value="media">
								Make changes to your media here.
							</TabsContent>
							<TabsContent value="saved"> Change your saved here. </TabsContent>
						</Tabs>
					</div>
				</div>
			</ScrollArea>
		</div>
	</div>
</template>
