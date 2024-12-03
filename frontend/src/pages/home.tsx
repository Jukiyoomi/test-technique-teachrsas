import { useGetAllProductsQuery } from "#root/services/store/product";
import { Loader2 } from "lucide-react";
import {Small} from "#root/components/ui/typography";

export function Home() {
	const { data, error, isLoading } = useGetAllProductsQuery();

	return (
		<div className="flex flex-col items-center justify-center h-full">

			{isLoading && (
				<div className="flex items-center gap-5">
					<Loader2 className="animate-spin"/>
					<Small>Chargement des produits</Small>
				</div>
			)}

			{error && <p>Une erreur est survenue : {JSON.stringify(error, null, 2)}</p>}

			{data && (
				<div>
					<h2 className="text-2xl font-bold">Products</h2>
					<ul>
						{data.map((product) => (
							<li key={product.id}>
								<p>{product.name}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}