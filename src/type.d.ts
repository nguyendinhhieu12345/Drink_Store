export interface Auth {
	username: string;
	password: string;
}
export interface signupState {
	username: string;
	email: string;
	password: string;
	full_name: string;
}
export interface User {
	userId: string;
	username: string;
	role: string | null;
	full_name: string;
	createdAt: string;
	updatedAt: string;
	avatar: string | FileList;
	phone: string;
	email: string;
	accessToken: string;
	user_id: string;
	address?: string;
	birthday?: string;
	address: string;
	birthday: string;
	status?: string;
}

export interface BaseResponseApi {
	timestamp: string;
	success: boolean;
	message: string;
}