import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "#root/components/ui/table";
import {LargeText} from "#root/components/ui/typography";
import {formatCurrency} from "#root/services/format-currency";
import {Category} from "#root/services/schema/category.ts";

type Props = {
	products: Category["products"];
}

export function CategoryProductsList({ products }: Props) {
	return (
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
				{
					products.length > 0 ? (
						products.map((product) => (
							<TableRow key={product.id}>
								<TableCell>{product.id}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={3} className="text-center">Cette catégorie ne possède pas de produit pour l'instant</TableCell>
						</TableRow>
					)
				}
			</TableBody>
		</Table>
	)
}