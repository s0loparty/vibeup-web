<template>
	<ul class="px-2.5 bg-white">
		<li class="flex items-center py-1.25 hover:bg-gray-200 cursor-pointer transition-colors" v-for="num in 50"
			:key="num">
			<div class="mr-3.75">
				<!--картинка чата-->
				<div class="w-16.5 h-16.5 bg-blue-400 rounded-[50%]"></div>
			</div>

			<div>
				<div class="flex justify-between gap-2.5">
					<span>Заголовок чата / Имя Человека</span>
					<span>16:41</span>
				</div>
				<!--todo: truncate для превью сообщений в конце 3 точки и т.д-->
				<span>Последнее сообщение в чате</span>
			</div>
		</li>
	</ul>
</template>
