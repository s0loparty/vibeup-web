import type { TWallpaperOptions } from '@/app/types/wallpaper';
import animals from '@/assets/patterns/animals.svg';
import astronautCats from '@/assets/patterns/astronaut_cats.svg';
import beach from '@/assets/patterns/beach.svg';
import catsAndDogs from '@/assets/patterns/cats_and_dogs.svg';
import shrek from '@/assets/patterns/shrek.webp';
import space from '@/assets/patterns/space.svg';

const size = window.innerWidth > 680 ? '500px' : '30%';

export const STATIC_WALLPAPERS: TWallpaperOptions[] = [
	{
		colors: ['#515151', '#515151', '#515151', '#515151'],
		animate: false,
		fps: 1,
		pattern: {
			opacity: 0.2,
			mask: true,
			size,
			image: astronautCats,
			background: 'none',
		},
	},
	// {
	// 	colors: ['#dbddbb', '#6ba587', '#d5d88d', '#88b884'],
	// 	animate: false,
	// 	fps: 30,
	// 	pattern: {
	// 		mask: false,
	// 		size,
	// 		image: astronautCats,
	// 	},
	// },
	{
		colors: ['#dbddbb', '#6ba587', '#d5d88d', '#88b884'],
		animate: false,
		scrollAnimate: false,
		tails: 6,
		fps: 1,
		pattern: {
			mask: false,
			opacity: 1,
			size,
			image: shrek,
			blur: 0,
		},
	},
	{
		colors: ['#ecd893', '#e5a1d0', '#edd594', '#d1a3e2'],
		animate: false,
		fps: 1,
		pattern: {
			mask: false,
			size,
			image: animals,
		},
	},
	{
		colors: ['#679ced', '#e39fea', '#888dec', '#8adbf2'],
		animate: false,
		fps: 1,
		pattern: {
			mask: false,
			size,
			image: beach,
		},
	},
	{
		colors: ['#dbddbb', '#6ba587', '#d5d88d', '#88b884'],
		animate: false,
		fps: 1,
		pattern: {
			mask: false,
			size,
			image: catsAndDogs,
		},
	},
	{
		colors: ['#dbddbb', '#6ba587', '#d5d88d', '#88b884'],
		animate: false,
		fps: 1,
		pattern: {
			mask: false,
			size,
			image: space,
		},
	},
];
