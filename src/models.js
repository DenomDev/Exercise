import { writable } from 'svelte/store';

export const user = writable({
	email: null,
	password: null,
	repeatPassword: null,
	displayName: null,
	phone: null,
	address: null,
})

export const error = writable({
	flag: false,
	code: null,
	message: null,
})