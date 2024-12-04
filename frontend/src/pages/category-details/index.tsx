import {getRouteApi} from "@tanstack/react-router";
import {H2} from "#root/components/ui/typography";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "#root/components/ui/tabs";
import {CategoryProductsList} from "#root/pages/category-details/category-products-list";
import {DeleteCategoryDialog} from "#root/pages/category-details/delete-category-dialog";
import {EditForm} from "#root/pages/category-details/edit-form";

export function CategoryDetails() {
	const route = getRouteApi('/container/category/$categoryId')
	const data = route.useLoaderData()

	return (
		<div>
			<div className="flex flex-col gap-3 items-center">
				<H2 centered>{data.name}</H2>
				<div>
					<DeleteCategoryDialog
						categoryId={data.id}
					/>
				</div>
			</div>
			<Tabs defaultValue="view" className="flex flex-col items-center">
				<TabsList className="w-5/6 mx-auto my-10">
					<TabsTrigger value="view" className="w-1/2">Mode lecture</TabsTrigger>
					<TabsTrigger value="edit" className="w-1/2">Mode édition</TabsTrigger>
				</TabsList>
				<TabsContent value="view" className="w-5/6">
					<CategoryProductsList products={data.products} />
				</TabsContent>
				<TabsContent value="edit" className="w-5/6">
					<EditForm
						categoryId={data.id}
						defaultValues={{
							name: data.name,
						}}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}