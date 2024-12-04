import {Button} from "#root/components/ui/button";
import {CopyIcon} from "lucide-react";
import {toast} from "sonner";
import {Product} from "#root/services/schema/product";
import {DeleteProductDialog} from "#root/pages/home/components/delete-product-dialog";
import {EditProductDialog} from "#root/pages/home/components/edit-product-dialog.tsx";

type Props = {
	product: Product
}

export function TableRowActions({ product }:Props) {
	return (
		<div className="flex items-center justify-end gap-3">
			<Button
				variant="ghost"
				className="h-8 w-8 p-0"
				onClick={() => {
					navigator.clipboard.writeText(product.name)
						.then(() => toast.info("Le nom du produit a été copié !"))
				}}
			>
				<CopyIcon className="h-4 w-4" />
			</Button>
			<EditProductDialog product={product} />
			<DeleteProductDialog product={product} />
		</div>
	)
}