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

type Props = {
	onDelete: () => void;
	isLoading: boolean;
}

export function DeleteCategoryDialog({ onDelete, isLoading }: Props) {
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
