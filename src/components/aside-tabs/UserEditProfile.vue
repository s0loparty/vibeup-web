<script setup lang="ts">
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '@/components/ui/avatar'
import { ArrowLeftIcon, ImagePlusIcon } from 'lucide-vue-next';
</script>

<template>
	<div class="bg-white">
		<div id="user-edit-profile">
			<div>
				<div class="flex items-center gap-4 w-full py-2">
					<Button variant="ghost">
						<ArrowLeftIcon class="size-6" />
					</Button>
					<span class="font-bold text-xl">Edit Profile</span>
				</div>

				<div>
					<div class="flex justify-center py-6">
						<div class="relative group">
							<button class="cursor-pointer block">
								<Avatar class="size-30">
									<AvatarImage class="brightness-50" src="https://github.com/shadcn.png" alt="@shadcn" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</button>
							<ImagePlusIcon
								class="size-13 text-white absolute left-1/2 top-1/2 -translate-1/2 cursor-pointer  group-hover:scale-120 transition-transform duration-200" />
						</div>
					</div>

					<form class="p-4 space-y-4">
						<div class="relative">
							<Input id="name" type="text"
								class="peer w-full rounded-md border border-gray-300 px-3 py-2 placeholder-transparent focus:border-blue-500 focus:outline-none focus:placeholder:relative focus:placeholder:-top-full"
								placeholder="Name" />
							<label for="name"
								class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
								Name
							</label>
						</div>

						<div class="relative">
							<Input id="lastName" type="text"
								class="peer w-full rounded-md border border-gray-300 px-3 py-2 placeholder-transparent focus:border-blue-500 focus:outline-none focus:placeholder:relative focus:placeholder:-top-full"
								placeholder="Last Name" />
							<label for="lastName"
								class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
								Last Name
							</label>
						</div>

						<div class="relative">
							<Input id="userName" type="text"
								class="peer w-full rounded-md border border-gray-300 px-3 py-2 placeholder-transparent focus:border-blue-500 focus:outline-none focus:placeholder:relative focus:placeholder:-top-full"
								placeholder="Username" />
							<label for="userName"
								class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
								Username
							</label>
						</div>

						<div class="relative">
							<textarea id="bio" type="text"
								class="resize-none peer w-full rounded-md border border-gray-300 px-3 py-2 placeholder-transparent focus:border-blue-500 focus:outline-none focus:placeholder:relative focus:placeholder:-top-full"
								placeholder="Bio (optional)" />
							<label for="bio"
								class="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
								Bio (optional)
							</label>
						</div>

					</form>

				</div>

			</div>
		</div>

	</div>
</template>
