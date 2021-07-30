import { Unauthorized } from "./httpStatus";

const httpErrorHandlers = {

	[ Unauthorized ] : () => {
		console.log("Você não tem autorização")
	}

};

export const httpErrorHandler = <T extends Error>(error: T) => {

	if ('response' in error) {

		const { status } = error.response;
		const handler = httpErrorHandlers[status];

		handler && handler(error)

	}

};