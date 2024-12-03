import {getRouteApi} from "@tanstack/react-router";

export function CategoryDetails() {
	const route = getRouteApi('/container/category/$categoryId')
	const data = route.useLoaderData()

	return (
		<div>
			<h1>{data.name}</h1>
		</div>
	);
}