import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,

} from "#root/components/ui/dialog";
import {Button} from "#root/components/ui/button";
import {Loader2, TrashIcon} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";
import {toast} from "sonner";
import {useDeleteProductMutation} from "#root/services/store/product";
import {Product} from "#root/services/schema/product";

type Props = {
	product: Product;
}

export function DeleteProductDialog({ product }: Props) {
	const [deleteProduct, { isLoading }] = useDeleteProductMutation()
	const navigate = useNavigate()

	const onDelete = async () => {
		deleteProduct(product.id)
			.unwrap()
			.then(() => toast.success("Le produit a été supprimé !"))
			.then(() => navigate({ to: "." }))
			.catch((error) => {
				console.log(error)
				toast.error("Une erreur s'est produite lors de la suppression du produit.")
			})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="h-8 w-8 p-0"
				>
					<TrashIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Suppression</DialogTitle>
					<DialogDescription>
						Attention, vous êtes sur le point de supprimer le produit {product.name}.
						Cette action est irréversible.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button>Annuler</Button>
					</DialogClose>
					<Button variant="secondary" disabled={isLoading} onClick={onDelete}>
						{isLoading && <Loader2 className="animate-spin" />}
						{isLoading ? "Suppression en cours..." : "Confirmer la suppression"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
