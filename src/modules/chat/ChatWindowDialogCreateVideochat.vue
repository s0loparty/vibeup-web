<script setup lang="ts">
import { Button } from '@/app/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/dialog';
</script>

<template>
	<Dialog>
		<DialogContent class="sm:max-w-106.25">
			<DialogHeader>
				<DialogTitle>Edit profile</DialogTitle>
				<DialogDescription>
					Make changes to your profile here. Click save when you're done.
				</DialogDescription>
			</DialogHeader>

			<div>
				Далеко-далеко за словесными горами в стране, гласных и согласных живут
				рыбные тексты. Заглавных букв выйти рот переулка путь образ не
				курсивных, вершину снова заманивший безорфографичный наш предупреждал
				семь но единственное над свой приставка которое буквенных власти.
				Коварный продолжил журчит не диких снова приставка дал заголовок
				предупреждал он пунктуация подзаголовок за, о запятых вопроса свой
				текста то которое подпоясал пустился образ от всех до сих ipsum однажды.
				Предложения ее то переписывается жизни океана текста грамматики
				курсивных залетают вскоре наш большой, все последний назад. Первую ты
				его алфавит инициал пустился, это города осталось предупреждал
				заманивший предложения текста. Вершину своих маленькая использовало
				реторический алфавит пустился толку.
			</div>

			<DialogFooter>
				<DialogClose as-child>
					<Button variant="outline"> Cancel </Button>
				</DialogClose>
				<Button type="submit"> Save changes </Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
