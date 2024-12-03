import {ColumnDef} from "@tanstack/react-table"
import {Product} from "#root/services/schema/product";
import {LargeText, Paragraph} from "#root/components/ui/typography";
import {MoreHorizontal} from "lucide-react";
import {Button} from "#root/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "#root/components/ui/dropdown-menu";
import {toast} from "sonner";

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
	{
		id: "actions",
		cell: ({ row }) => {
			const product = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => {
								navigator.clipboard.writeText(product.name)
									.then(() => toast.info("Le nom du produit a été copié !"))
							}}
						>
							Copier le nom
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
