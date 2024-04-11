import { helpers } from "kirby";
import { responder } from "@/panel/request.js";

export default (api) => {
	return async (path, options = {}) => {
		// create options object
		options = {
			cache: "no-store",
			credentials: "same-origin",
			mode: "same-origin",
			headers: {
				"content-type": "application/json",
				"x-csrf": api.csrf,
				"x-language": api.language,
				...helpers.object.toLowerKeys(options.headers ?? {})
			},
			...options
		};

		// adapt headers for all non-GET and non-POST methods
		if (
			api.methodOverwrite &&
			options.method !== "GET" &&
			options.method !== "POST"
		) {
			options.headers["x-http-method-override"] = options.method;
			options.method = "POST";
		}

		// build the request URL
		options.url =
			helpers.string.rtrim(api.endpoint, "/") +
			"/" +
			helpers.string.ltrim(path, "/");

		// The request object is a nice way to access all the
		// important parts later in errors for example
		const request = new Request(options.url, options);

		// fetch the request's response
		const { response } = await responder(request, await fetch(request));

		let data = response.json;

		// simplify the response
		if (data.data && data.type === "model") {
			data = data.data;
		}

		return data;
	};
};
