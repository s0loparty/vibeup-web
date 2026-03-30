<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { AtSignIcon, BellIcon, XIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import BaseNavigationItem from '../base/BaseNavigationItem.vue';

const { showPanel } = storeToRefs(useUserInfoStore());
</script>

<template>
	<Transition
		enter-active-class="transition-all duration-200 ease-out"
		leave-active-class="transition-all duration-200 ease-in"
		enter-from-class="translate-x-full opacity-0"
		enter-to-class="translate-x-0 opacity-100"
		leave-from-class="translate-x-0 opacity-100"
		leave-to-class="translate-x-full opacity-0"
	>
		<div
			v-if="showPanel"
			style="box-shadow: 0 0.25rem 0.5rem 0.1rem #0003"
			class="absolute top-0 right-0 z-99 flex h-full w-sm shrink-0 flex-col bg-gray-400 shadow-bottom"
		>
			<!-- avatar + user info -->
			<div class="relative shrink-0">
				<div
					class="absolute top-0 right-0 left-0 h-25 bg-linear-to-b from-black/50 to-transparent"
				></div>
				<div class="absolute top-0 flex w-full items-center gap-4 p-2">
					<Button
						variant="ghost"
						class="text-white hover:bg-white/30 hover:text-white"
						@click="showPanel = false"
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

			<!-- username & notifications -->
			<div class="mb-2.5 shrink-0 bg-white shadow-bottom">
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

			<!-- content -->
			<div class="min-h-0 flex-1 overflow-hidden bg-white">
				<div class="flex h-full flex-col">
					<Tabs default-value="media" class="flex h-full flex-col p-2">
						<TabsList class="w-full shrink-0">
							<TabsTrigger value="media"> Media </TabsTrigger>
							<TabsTrigger value="saved"> Pinned </TabsTrigger>
						</TabsList>

						<TabsContent value="media" class="flex-1 overflow-hidden">
							<ScrollArea class="h-full">
								<div class="space-y-4">
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Dicta dolor odit rerum aut, vitae minima reprehenderit ex,
									quis labore illum magni atque architecto blanditiis magnam
									beatae veritatis porro corrupti possimus! Optio at ullam
									exercitationem. Minima velit dignissimos labore officiis
									maiores tempore possimus ut hic iste nobis, voluptates
									adipisci voluptas non nulla, atque in quia mollitia, enim
									aliquam sint. Error, qui. Sapiente, fugit ipsam numquam
									cumque, distinctio animi provident deserunt tenetur in at
									nostrum blanditiis enim delectus vel accusamus dolorum
									necessitatibus laudantium repellat sit odit! Sit eius corrupti
									quibusdam omnis saepe! Ab vel minima perspiciatis aliquid
									nihil, maiores, possimus inventore sunt odit, iusto voluptas
									nam voluptatum necessitatibus ipsa sit quos expedita
									recusandae tenetur libero! Accusantium eveniet sapiente autem
									id, est ex! Ullam quas sed modi odio a tenetur voluptates
									reprehenderit, accusamus aperiam odit nobis non! Aliquam non
									nam eligendi impedit esse itaque corporis tenetur dolorem!
									Quibusdam, aspernatur. Sint impedit ut maiores. Atque eos
									aspernatur consequuntur, quae consectetur ex natus cumque. Ea
									obcaecati omnis impedit sunt fugit officiis animi minima ex.
									Beatae, nostrum. Sit maiores sed quibusdam ab error neque
									architecto voluptatibus. Nam, deserunt reprehenderit nihil
									unde mollitia quasi incidunt ratione laborum nobis
									perspiciatis obcaecati recusandae ipsa facilis quis facere
									quaerat aliquam veniam dolorum officia similique vero sapiente
									aliquid quos. Similique, quidem. Assumenda quidem temporibus
									quos sed atque deserunt dolorum aspernatur illo voluptatibus,
									corrupti eligendi blanditiis culpa tempora molestiae, iste
									esse ea fugit mollitia delectus ducimus possimus ipsam saepe
									neque vel. Dolores. Debitis ipsa assumenda facilis ratione,
									hic soluta cum id adipisci sed natus saepe accusantium,
									veritatis reiciendis doloremque corrupti vitae, at quae
									eveniet nihil tempore obcaecati fugiat necessitatibus.
									Inventore, veritatis recusandae. Beatae dolores quis excepturi
									quas corporis, maxime eveniet officiis atque accusantium
									molestias facilis quisquam iste aliquid assumenda blanditiis,
									laborum consectetur non at possimus libero. Quos rem molestiae
									aperiam dignissimos provident! Quibusdam atque veniam
									consectetur consequuntur dolores temporibus minima aperiam,
									sunt enim laborum aliquid qui. Ducimus fugit officia
									doloribus, suscipit expedita veritatis reprehenderit molestiae
									mollitia impedit est soluta! Deleniti, error dolorum. Officia
									magnam ab voluptatibus eveniet, velit consequatur ratione
									magni natus error molestias architecto, fugiat esse dolor
									nulla! Quasi, beatae mollitia. Aperiam sit unde id tempore
									quisquam hic debitis. Illo, asperiores! Quod sint, dolor
									fugiat odio reprehenderit voluptates natus voluptatibus optio
									itaque, veniam mollitia explicabo et eos culpa, quasi
									recusandae consequatur atque excepturi. Inventore fuga neque
									sapiente corporis ipsa maiores voluptatum. Sit, dolore error.
									Eius fugit dolore officiis, commodi, quam quasi quidem
									voluptas tenetur veniam repellat necessitatibus voluptate
									minus omnis magni expedita animi ipsa distinctio aliquam ab.
									Esse rerum itaque modi? Vero, exercitationem, quibusdam quam
									eveniet eum nam asperiores sint neque quae, odit sed.
									Accusantium laudantium nam a, officia consectetur beatae
									praesentium? Doloremque qui laboriosam harum exercitationem
									nulla atque vero fugiat. Tenetur iusto praesentium laborum
									illo impedit. Repellat, accusantium reiciendis? Repudiandae
									molestiae, adipisci deserunt odio porro ratione reiciendis.
									Pariatur, iusto error similique ipsum sit beatae fugiat porro
									vero eius repellat est? Autem fugit veniam minima est vero
									molestiae sequi iusto perferendis quis eligendi? Nulla
									mollitia atque aliquam aliquid, saepe est earum, minima, a
									quasi voluptates quos illo voluptatibus assumenda tenetur.
									Nemo? Corporis, ipsa assumenda. Ratione corrupti suscipit
									doloremque ducimus blanditiis eum officiis? Harum
									exercitationem maiores itaque voluptatibus hic aliquid
									blanditiis magni ipsum illum, nihil voluptates animi corrupti,
									quod vel suscipit tempora! Eum at eos adipisci excepturi!
									Dolores eveniet ut a consequuntur porro, fugit explicabo
									quibusdam eos dolorum iusto aspernatur reprehenderit quae
									reiciendis qui sint et laboriosam dignissimos! Deserunt nobis
									nesciunt magni. Vitae, commodi accusantium perferendis
									laboriosam eius saepe deleniti neque? Saepe delectus
									voluptates harum recusandae. Quaerat tenetur repudiandae
									laudantium, mollitia laboriosam illo dicta consectetur
									molestias ab. Quos in commodi aliquam id!
								</div>
							</ScrollArea>
						</TabsContent>

						<TabsContent value="saved" class="flex-1 overflow-hidden">
							<ScrollArea class="h-full">
								<div class="space-y-4">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Doloremque autem omnis, quo, dolorem soluta id sit beatae et
									tempora maxime commodi, repudiandae repellendus exercitationem
									illo perspiciatis temporibus atque sunt vero! Magni placeat
									rem maiores perferendis nam inventore dignissimos ipsa?
									Pariatur, in maiores! Ullam, error provident sunt porro, autem
									quod odit accusantium consequatur itaque maiores recusandae
									sapiente cumque at, aut hic? Blanditiis dicta neque molestiae
									asperiores sunt officiis a temporibus totam tempore alias
									atque ratione laboriosam ex doloribus magnam harum, quibusdam
									aspernatur magni corporis, illum in. Voluptatem at ipsum
									assumenda tenetur! In accusantium quis consequatur. Aliquam
									placeat omnis velit! Molestiae delectus voluptatibus voluptate
									aliquid nostrum eaque sunt repellendus! Cumque dolorem
									necessitatibus ab sint repudiandae eveniet adipisci earum
									aperiam ipsum! Numquam, neque? Ducimus nesciunt, iste neque
									tempore id repudiandae illo perferendis temporibus itaque
									voluptas soluta provident ea ipsum quasi ut doloribus maxime
									illum natus, expedita, quisquam incidunt consequuntur
									aspernatur labore. Sit, recusandae! Soluta assumenda
									architecto, ex non laborum consectetur nemo aut, minus
									similique cum quo maxime! Eos, ratione aliquam ad dolorem cum
									quibusdam fugiat, saepe deleniti earum iusto id accusamus
									repudiandae veritatis. Corrupti unde doloribus magnam quod
									dignissimos eveniet aliquid, aspernatur aperiam iure provident
									id earum doloremque possimus, maxime alias, quibusdam sit enim
									dicta nobis numquam nam quaerat architecto hic beatae. Quas?
									Nulla atque repellat illum corporis sunt nobis odit libero
									fugiat quae ex distinctio vero non tenetur in deleniti
									facilis, necessitatibus cumque, voluptate maxime? Libero
									labore minus sequi similique harum laborum. Incidunt, nisi
									corporis? Impedit laborum consectetur praesentium dolorem sunt
									doloribus a accusantium illo molestias maiores, magnam neque
									numquam repellat fuga officiis! Itaque magnam earum, illum
									saepe reiciendis aliquam? Sapiente, ullam. Temporibus eos
									dolor voluptatum cumque doloribus dolore omnis neque impedit
									quos. Minima natus obcaecati quibusdam architecto praesentium,
									debitis sint porro dolorum, expedita consequatur nemo
									repudiandae voluptates a odit temporibus magnam. Ad laudantium
									aperiam enim similique exercitationem nobis? Ut dolorem
									facilis voluptatum esse nesciunt, possimus natus accusantium
									id enim consequuntur adipisci deserunt tenetur sit eum illum
									eos, sed, expedita at vero! Cum ullam autem quaerat delectus
									voluptatum adipisci perferendis illum praesentium facilis ab?
									Quod architecto rerum aut amet dignissimos, sunt voluptatibus
									quidem voluptates dolor illum adipisci eaque? Deserunt vel at
									dignissimos. Vel velit doloribus provident eos, sit quisquam
									doloremque nulla obcaecati dicta? Consectetur aspernatur rem,
									repellat vero deleniti expedita blanditiis enim, temporibus
									voluptatum cum exercitationem impedit dolores mollitia aliquid
									eveniet! Deserunt? Cupiditate corrupti nihil, soluta quaerat
									doloribus enim, deserunt, deleniti id ea saepe dignissimos non
									nesciunt explicabo culpa molestias hic. Modi sapiente suscipit
									eaque molestias. Fuga ipsa aliquam laudantium rerum quo?
									Dolorum, ipsum odit officiis illo ratione quasi perferendis
									fuga voluptatibus nostrum eaque sequi laudantium modi quidem
									ex magni at sit itaque commodi impedit tenetur corporis
									facere! Optio vero tenetur illo. Incidunt assumenda repellat
									esse rem libero hic reprehenderit suscipit quam quia et omnis
									ducimus minus optio, nesciunt expedita nisi! Illo quisquam
									officiis quas, temporibus unde error ipsam aut maxime sequi!
									Mollitia laboriosam voluptatem harum, molestiae modi earum a
									nam, soluta aliquam dolore distinctio eveniet velit est
									dolorem! Pariatur, placeat necessitatibus. Tempora quis harum
									eaque tempore asperiores eveniet eius aliquid quibusdam!
									Accusantium atque sint aliquam rem, doloremque adipisci
									exercitationem nisi repellendus, non corrupti voluptas?
									Reprehenderit quod velit officiis, ducimus magnam assumenda
									numquam. Blanditiis labore quo quaerat alias, ab in veniam
									quae? Possimus nihil est quibusdam, beatae non ullam quis nam
									officiis blanditiis numquam, unde molestias excepturi in amet
									assumenda iure iusto nobis vitae reprehenderit ad porro
									debitis. Corporis perspiciatis asperiores exercitationem.
									Recusandae id repellat blanditiis. Expedita recusandae
									asperiores magnam perspiciatis! Incidunt iusto similique rerum
									voluptates blanditiis facilis molestias aliquam. Laboriosam
									assumenda culpa facere quae rerum alias accusantium eligendi
									sequi molestiae quia!
								</div>
							</ScrollArea>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	</Transition>
</template>
