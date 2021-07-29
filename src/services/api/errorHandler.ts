import { Unauthorized } from "./httpStatus";

const httpErrorHandlers = {

	[ Unauthorized ] : () => {
		console.log("Você não tem autorização")
	}

};

export const httpErrorHandler = (error: any) => {

	if (error.response) {

		const { status } = error.response;
		const handler = httpErrorHandlers[status];

		handler && handler(error)

	}

};