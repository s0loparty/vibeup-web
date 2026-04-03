import AsideLayout from '@/app/layouts/AsideLayout.vue';
import UserChatList from '@/modules/aside/aside-tabs/UserChatList.vue';
import UserEditProfile from '@/modules/aside/aside-tabs/UserEditProfile.vue';
import UserGeneral from '@/modules/aside/aside-tabs/UserGeneral.vue';
import UserGeneralWallpaper from '@/modules/aside/aside-tabs/UserGeneralWallpaper.vue';
import UserNotify from '@/modules/aside/aside-tabs/UserNotify.vue';
import UserPrivacy from '@/modules/aside/aside-tabs/UserPrivacy.vue';
import UserPrivacyBlacklist from '@/modules/aside/aside-tabs/UserPrivacyBlacklist.vue';
import UserPrivacyChangeEmail from '@/modules/aside/aside-tabs/UserPrivacyChangeEmail.vue';
import UserSettings from '@/modules/aside/aside-tabs/UserSettings.vue';
import UserStorage from '@/modules/aside/aside-tabs/UserStorage.vue';
import { type NamedRouteRecordRaw } from 'vue-routes-to-types';
import UserSettingsTabList from './aside-tabs/UserSettingsTabList.vue';

export default [
	{
		path: '/',
		component: AsideLayout,
		name: 'main',
		meta: { auth: true },
		children: [
			{
				path: '',
				component: UserChatList,
				name: 'chatlist',
				meta: { level: 1 },
			},
			{
				path: 'settings',
				component: UserSettings,
				name: 'settings',
				meta: { level: 2 },
				children: [
					{
						path: '',
						component: UserSettingsTabList,
						name: 'settings:index',
						meta: { level: 2 },
					},
					{
						path: 'profile-edit',
						component: UserEditProfile,
						name: 'settings:profile-edit',
						meta: { level: 3 },
					},
					{
						path: 'notify',
						component: UserNotify,
						name: 'settings:notify',
						meta: { level: 3 },
					},
					{
						path: 'storage',
						component: UserStorage,
						name: 'settings:storage',
						meta: { level: 3 },
					},
					{
						path: 'privacy',
						component: UserPrivacy,
						name: 'settings:privacy',
						meta: { level: 3 },
						children: [
							{
								path: 'change-email',
								component: UserPrivacyChangeEmail,
								name: 'settings:privacy:change-email',
								meta: { level: 4 },
							},
							{
								path: 'blacklist',
								component: UserPrivacyBlacklist,
								name: 'settings:privacy:blacklist',
								meta: { level: 4 },
							},
						],
					},
					{
						path: 'general',
						component: UserGeneral,
						name: 'settings:general',
						meta: { level: 3 },
						children: [
							{
								path: 'wallpaper',
								component: UserGeneralWallpaper,
								name: 'settings:general:wallpaper',
								meta: { level: 4 },
							},
						],
					},
				],
			},
		],
	},
] as const satisfies NamedRouteRecordRaw[];
