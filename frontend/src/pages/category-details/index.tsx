import {getRouteApi, useNavigate} from "@tanstack/react-router";
import {H2, Paragraph} from "#root/components/ui/typography";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "#root/components/ui/tabs";
import {useDeleteCategoryMutation} from "#root/services/store/category";
import {CategoryProductsList} from "#root/pages/category-details/category-products-list";
import {DeleteCategoryDialog} from "#root/pages/category-details/delete-category-dialog";
import {toast} from "sonner";

export function CategoryDetails() {
	const route = getRouteApi('/container/category/$categoryId')
	const data = route.useLoaderData()
	const [deleteCategory, {isLoading}] = useDeleteCategoryMutation()
	const navigate = useNavigate()

	const onDelete = async () => {
		deleteCategory(data.id)
			.unwrap()
			.then(() => navigate({ to: "/" }))
			.catch(() => toast.error("Une erreur s'est produite lors de la suppression de la catégorie. Veuillez réessayer."))
	}

	return (
		<div>
			<div className="flex flex-col gap-3 items-center">
				<H2 centered>{data.name}</H2>
				<div>
					<DeleteCategoryDialog
						onDelete={onDelete}
						isLoading={isLoading}
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
					<Paragraph>Mode édition. À venir.</Paragraph>
				</TabsContent>
			</Tabs>
		</div>
	);
}