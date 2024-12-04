import {getRouteApi} from "@tanstack/react-router";
import {H2} from "#root/components/ui/typography";
import {CategoryProductsList} from "#root/pages/category-details/category-products-list";

export function CategoryDetails() {
	const route = getRouteApi('/container/category/$categoryId')
	const data = route.useLoaderData()

	return (
		<div>
			<H2 centered>{data.name}</H2>
			<CategoryProductsList products={data.products} />
		</div>
	);
}