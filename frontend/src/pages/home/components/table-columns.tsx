import {ColumnDef} from "@tanstack/react-table"
import {Product} from "#root/services/schema/product";
import {LargeText, Paragraph} from "#root/components/ui/typography";

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "name",
		header: () => <LargeText>Nom</LargeText>,
	},
	{
		accessorKey: "description",
		header: () => <LargeText>Description</LargeText>,
		cell: ({ row }) => {
			const maxLength = 20;
			const description = String(row.getValue("description"));
			if(description.length > maxLength) return <abbr title={description}>{description.slice(0, maxLength)}...</abbr>
			return <Paragraph>{description}</Paragraph>
		}
	},
	{
		accessorKey: "price",
		header: () => <LargeText>Prix</LargeText>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("price"))
			return new Intl.NumberFormat("fr-FR", {
				style: "currency",
				currency: "EUR",
			}).format(amount)
		},
	},
	{
		accessorKey: "category.name",
		header: () => <LargeText><div className="text-right">Catégorie</div></LargeText>,
		cell: ({ row }) => {
			const category = String(row.getValue("category_name"))
			return <div className="text-right">{category}</div>
		}
	},
]
