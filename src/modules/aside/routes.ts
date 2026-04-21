import AsideLayout from '@/app/layouts/AsideLayout.vue';
import UserChatList from '@/modules/aside/aside-tabs/UserChatList.vue';
import UserEditProfile from '@/modules/aside/aside-tabs/UserEditProfile.vue';
import UserGeneral from '@/modules/aside/aside-tabs/UserGeneral.vue';
import UserGeneralWallpaper from '@/modules/aside/aside-tabs/UserGeneralWallpaper.vue';
import UserNotify from '@/modules/aside/aside-tabs/UserNotify.vue';
import UserPrivacyBlacklist from '@/modules/aside/aside-tabs/UserPrivacyBlacklist.vue';
import UserPrivacyChangeEmail from '@/modules/aside/aside-tabs/UserPrivacyChangeEmail.vue';
import UserStorage from '@/modules/aside/aside-tabs/UserStorage.vue';
import { type NamedRouteRecordRaw } from 'vue-routes-to-types';
import UserChatCreateGroupPage from '../pages/UserChatCreateGroupPage.vue';
import UserSettingsGeneralPage from '../pages/UserSettingsGeneralPage.vue';
import UserSettingsPage from '../pages/UserSettingsPage.vue';
import UserSettingsPrivacyPage from '../pages/UserSettingsPrivacyPage.vue';
import UserChatCreateGroup from './aside-tabs/UserChatCreateGroup.vue';
import UserChatCreateGroupSettings from './aside-tabs/UserChatCreateGroupSettings.vue';
import UserChatCreatePrivat from './aside-tabs/UserChatCreatePrivat.vue';
import UserPrivacy from './aside-tabs/UserPrivacy.vue';
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
				component: UserSettingsPage,
				name: 'settings',
				meta: { level: 2 },
				redirect: { name: 'settings:index' },
				children: [
					{
						path: '',
						component: UserSettingsTabList,
						name: 'settings:index',
						meta: { level: 3 },
					},
					{
						path: 'profile-edit',
						component: UserEditProfile,
						name: 'settings:profile-edit',
						meta: { level: 4 },
					},
					{
						path: 'notify',
						component: UserNotify,
						name: 'settings:notify',
						meta: { level: 4 },
					},
					{
						path: 'storage',
						component: UserStorage,
						name: 'settings:storage',
						meta: { level: 4 },
					},
					{
						path: 'privacy',
						component: UserSettingsPrivacyPage,
						name: 'settings:privacy',
						meta: { level: 4 },
						redirect: { name: 'settings:privacy.index' },
						children: [
							{
								path: '',
								component: UserPrivacy,
								name: 'settings:privacy.index',
								meta: { level: 4 },
							},
							{
								path: 'change-email',
								component: UserPrivacyChangeEmail,
								name: 'settings:privacy:change-email',
								meta: { level: 5 },
							},
							{
								path: 'blacklist',
								component: UserPrivacyBlacklist,
								name: 'settings:privacy:blacklist',
								meta: { level: 5 },
							},
						],
					},
					{
						path: 'general',
						component: UserSettingsGeneralPage,
						name: 'settings:general',
						meta: { level: 4 },
						redirect: { name: 'settings:general:index' },
						children: [
							{
								path: '',
								component: UserGeneral,
								name: 'settings:general:index',
								meta: { level: 4 },
							},
							{
								path: 'wallpaper',
								component: UserGeneralWallpaper,
								name: 'settings:general:wallpaper',
								meta: { level: 5 },
							},
						],
					},
				],
			},
			{
				path: 'create-group',
				component: UserChatCreateGroupPage,
				name: 'create-group',
				meta: { level: 1 },
				redirect: { name: 'create-group:index' },
				children: [
					{
						path: '',
						component: UserChatCreateGroup,
						name: 'create-group:index',
						meta: { level: 1 },
					},
					{
						path: 'group-settings',
						component: UserChatCreateGroupSettings,
						name: 'create-group:settings',
						meta: { level: 2 },
					},
				],
			},
			{
				path: 'create-private',
				component: UserChatCreatePrivat,
				name: 'create-private',
				meta: { level: 1 },
			},
		],
	},
] as const satisfies NamedRouteRecordRaw[];
