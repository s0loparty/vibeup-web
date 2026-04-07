import * as yup from 'yup';

export const loginSchema = yup.object({
	email: yup
		.string()
		.min(1, 'Email обязателен для заполнения')
		.email('Email формат некорректный'),
	password: yup.string().min(8, 'Минимальный пароль 8 символов'),
	remember: yup.boolean(),
});
