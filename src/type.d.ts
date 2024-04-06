export interface Auth {
	email: string;
	password: string;
	fcmTokenId: string
}
export interface signupState {
	email: string;
	code: string;
	password: string;
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	fcmTokenId?: string;
}
export interface User {
	timestamp: string;
	status: boolean;
	message: string;
	data: {
		userId: string;
		accessToken: string;
	};
}

export interface BaseResponseApi {
	timestamp: string;
	success: boolean;
	message: string;
}

export interface IResponseGetTokenFCM {
	status: boolean;
	message: string;
}