<script setup lang="ts"></script>

<template>
	<main
		class="empty-chat relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 py-12 text-center sm:px-8"
	>
		<section
			aria-labelledby="empty-chat-title"
			class="relative z-10 flex w-full max-w-162.5 flex-col items-center"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-20 text-gray-800"
			>
				<path
					d="M3.086 17.509a2 2 0 00-.094-1.167 10 10 0 114.777 4.719 2 2 0 00-1.099-.092l-3.413.998a1 1 0 01-1.236-1.168z"
				/>
				<path d="M8 12h9" />
				<path d="M8 16h5" />
				<path d="M8 8h7" />
			</svg>
			<p class="mt-5 text-base text-gray-400 sm:text-lg">
				Выберите диалог или найдите пользователя и начните общение.
			</p>
		</section>
	</main>
</template>
