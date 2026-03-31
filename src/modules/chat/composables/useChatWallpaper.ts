import { STATIC_WALLPAPERS } from '@/app/constants/wallpapers';
import type { TWallpaperOptions } from '@/app/types/wallpaper';
import { useLocalStorage } from '@vueuse/core';

export const useChatWallpaper = () => {
	const wallpaper = useLocalStorage('chat-wallpaper', STATIC_WALLPAPERS[0]!);

	const setWallpaper = (w: TWallpaperOptions) => {
		wallpaper.value = w;
	};

	return { wallpaper, setWallpaper };
};
