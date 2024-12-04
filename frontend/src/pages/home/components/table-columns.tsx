import {ColumnDef} from "@tanstack/react-table"
import {Product} from "#root/services/schema/product";
import {LargeText, Paragraph} from "#root/components/ui/typography";
import { formatCurrency } from "#root/services/format-currency";
import {TableRowActions} from "#root/pages/home/components/table-row-actions.tsx";

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
			return formatCurrency(amount)
		},
	},
	{
		accessorKey: "category.name",
		header: () => <div className="text-right"><LargeText>Catégorie</LargeText></div>,
		cell: ({ row }) => {
			const category = String(row.getValue("category_name"))
			return <div className="text-right">{category}</div>
		}
	},
	{
		id: "actions",
		header: () => <div className="text-right"><LargeText>Actions</LargeText></div>,
		cell: ({ row }) => {
			const product = row.original

			return <TableRowActions product={product} />
		},
	},
]
