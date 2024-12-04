import {MoreHorizontal} from "lucide-react";
import {Button} from "#root/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "#root/components/ui/dropdown-menu";
import {Product} from "#root/services/schema/product";
import {toast} from "sonner";

type Props = {
	product: Product
}

export function TableRowActions({ product }:Props) {
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
}