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
import {useDeleteCategoryMutation} from "#root/services/store/category.ts";
import {useNavigate} from "@tanstack/react-router";
import {toast} from "sonner";

type Props = {
	categoryId: number;
}

export function DeleteCategoryDialog({ categoryId }: Props) {
	const [deleteCategory, {isLoading}] = useDeleteCategoryMutation()
	const navigate = useNavigate()

	const onDelete = async () => {
		deleteCategory(categoryId)
			.unwrap()
			.then(() => {
				toast.success("La catégorie a été supprimée avec succès.")
				navigate({ to: "/" })
			})
			.catch(() => toast.error("Une erreur s'est produite lors de la suppression de la catégorie. Veuillez réessayer."))
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<TrashIcon className="w-6 h-6 mr-2" />
					Supprimer la catégorie
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Suppression</DialogTitle>
					<DialogDescription>
						Attention, vous êtes sur le point de supprimer la catégorie. Cette action est irréversible.
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
