import type {ColumnDef, SortDirection} from "@tanstack/react-table"
import type {Product} from "#root/services/schema/product";
import {LargeText, Paragraph} from "#root/components/ui/typography";
import { formatCurrency } from "#root/services/format-currency";
import {TableRowActions} from "#root/pages/home/components/table-row-actions";
import {Button} from "#root/components/ui/button";
import {ArrowUp, ArrowDown} from "lucide-react";

function getSortIcon(direction: false | SortDirection) {
	if(direction === "asc") return <ArrowUp />
	if(direction === "desc") return <ArrowDown />
	return null
}

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				<LargeText>Nom</LargeText>
				{getSortIcon(column.getIsSorted())}
			</Button>
		),
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
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				<LargeText>Prix</LargeText>
				{getSortIcon(column.getIsSorted())}
			</Button>
		),
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
