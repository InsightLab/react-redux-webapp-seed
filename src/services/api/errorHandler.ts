import { AxiosError } from "axios";
import { Unauthorized } from "./httpStatus";

const httpErrorHandlers = (error?: AxiosError) => ({
	[ Unauthorized ] : () => { 
		console.log("Você não tem autorização")
	}
});

export const httpErrorHandler = <T>(error: AxiosError<T>) => {

	if (error.response) {
		const { status } = error.response;
		const handler = httpErrorHandlers(error)[status];
		handler && handler()
	}

};