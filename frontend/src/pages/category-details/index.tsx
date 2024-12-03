import {getRouteApi} from "@tanstack/react-router";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "#root/components/ui/table";
import {formatCurrency} from "#root/services/format-currency";
import {H2, LargeText} from "#root/components/ui/typography";

export function CategoryDetails() {
	const route = getRouteApi('/container/category/$categoryId')
	const data = route.useLoaderData()

	return (
		<div>
			<H2 centered>{data.name}</H2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>
							<LargeText>Identifiant de produit</LargeText>
						</TableHead>
						<TableHead>
							<LargeText>Nom</LargeText>
						</TableHead>
						<TableHead className="text-right">
							<LargeText>Prix</LargeText>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.products.map((product) => (
						<TableRow key={product.id}>
							<TableCell>{product.id}</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}