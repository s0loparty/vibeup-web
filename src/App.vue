<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import { MenuIcon, PencilIcon, SearchIcon, EllipsisVerticalIcon, SendIcon, SmileIcon, PaperclipIcon, } from 'lucide-vue-next';
import { Button } from './components/ui/button';
</script>

<template>
	<main class="app-container app-shadow">
		<div class="flex min-h-dvh">
			<!--на 925px примерно прячем и показываем стрелочку по клику навесное меню выезжает поверх чатика-->
			<aside class="bg-white min-w-105 relative flex flex-col h-screen">
				<div class="flex justify-between items-center p-2.5 gap-2.5">
					<Button variant="ghost" size="icon" class="p-0">
						<MenuIcon class="size-6" />
					</Button>
					<input type="text" placeholder="search_user" class="w-full bg-gray-200 rounded-[20px] px-3 py-3" />
				</div>

				<!-- Контейнер для скролла с фиксированной высотой -->
				<div class="flex-1 min-h-0 overflow-hidden">
					<ScrollArea class="h-full">
						<ul class="px-2.5">
							<li class="flex items-center py-1.25" v-for="num in 50" :key="num">
								<div class="mr-3.75">
									<!--картинка чата-->
									<div class="w-16.5 h-16.5 bg-blue-400 rounded-[50%]"></div>
								</div>

								<div>
									<div class="flex justify-between gap-2.5">
										<span>Заголовок чата / Имя Человека</span>
										<span>16:41</span>
									</div>
									<span>Последнее сообщение в чате</span>
								</div>
							</li>
						</ul>
					</ScrollArea>
				</div>

				<button class="w-14 h-14 bg-blue-400 rounded-[50%] flex justify-center items-center absolute right-3.75 bottom-3.75
					shadow-[0_0_10px_0_rgba(0,0,0,0.3)] cursor-pointer">
					<PencilIcon class="text-white" />
				</button>
			</aside>

			<section class="user__chat h-screen flex flex-col w-full">
				<div class="flex flex-col h-full">
					<!-- Хедер - фиксированная часть -->
					<div class="user__chat__header bg-white shrink-0">
						<div class="flex justify-between items-center p-4">
							<div class="flex items-center gap-2.5 w-[80%]">
								<!--аватарка-->
								<div class="bg-emerald-300 h-8 w-8 rounded-[50%]"></div>
								<div class="flex flex-col">
									<span>Name</span>
									<span class="text-sm text-gray-500">last seen recently</span>
								</div>
							</div>
							<div class="flex justify-between items-center gap-2.5">
								<Button variant="ghost" size="icon" class="p-0">
									<SearchIcon />
								</Button>
								<Button variant="ghost" size="icon" class="p-0">
									<EllipsisVerticalIcon />
								</Button>
							</div>
						</div>
					</div>

					<!-- Область сообщений с прокруткой -->
					<div class="flex-1 min-h-0 overflow-hidden">
						<ScrollArea class="h-full">
							<div class="chat p-4">
								<!--ЗДЕСЬ ЧЕРЕДУЕМ JUSTIFY-END & START когда люди чатятся -->
								<div v-for="num in 30" :key="num" class="message-group pt-2 flex">
									<div class="message bg-white rounded-[30px] p-2.5 shadow-sm max-w-[70%]">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste perferendis facere dolore deserunt
										sunt eveniet voluptatem dolores nisi id unde amet obcaecati sapiente soluta quo odit atque natus, et
										numquam.
									</div>
								</div>
							</div>
						</ScrollArea>
					</div>

					<!-- Футер - фиксированная часть -->
					<div class="shrink-0 bg-white p-4 border-t">
						<div class="w-full max-w-185 mx-auto relative">
							<div class="relative">
								<Button variant="ghost" size="icon" class="p-0 absolute left-2 top-2.5">
									<SmileIcon class="size-6 text-gray-500" />
								</Button>
								<textarea type="text" placeholder="Message"
									class="w-full bg-gray-200 pt-4 px-15 rounded-[15px] block mx-auto resize-none" />
								<Button variant="ghost" size="icon" class="p-0 absolute right-2 top-2.5">
									<PaperclipIcon class="size-6 text-gray-500" />
								</Button>
							</div>

							<button class="w-14 h-14 bg-blue-400 rounded-[50%] flex justify-center items-center absolute -right-16 top-0.5
					shadow-[0_0_10px_0_rgba(0,0,0,0.3)] cursor-pointer">
								<SendIcon class="text-white" />
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>

	</main>
</template>
