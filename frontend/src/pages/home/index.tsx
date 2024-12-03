import { useGetAllProductsQuery } from "#root/services/store/product";
import { Loader2 } from "lucide-react";
import {ProductsList} from "#root/pages/home/components/products-list";
import {Small} from "#root/components/ui/typography";
import {Button} from "#root/components/ui/button";

export function Home() {
	const { data, error, isLoading, refetch } = useGetAllProductsQuery();

	return (
		<div className="flex flex-col items-center justify-center h-full">

			{isLoading && (
				<div className="flex items-center gap-5">
					<Loader2 className="animate-spin"/>
					<Small>Chargement des produits</Small>
				</div>
			)}

			{error && (
				<div className="flex items-center gap-5">
					<Small>Erreur lors du chargement des produits</Small>
					<Button onClick={refetch}>Réessayer</Button>
				</div>
			)}

			{data && (
				<ProductsList products={data} />
			)}
		</div>
	)
}