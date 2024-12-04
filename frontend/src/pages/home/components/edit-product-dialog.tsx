import {
	Dialog,
	DialogClose,
	DialogContent, DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,

} from "#root/components/ui/dialog";
import {Button} from "#root/components/ui/button";
import {EditIcon, Loader2} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";
import {toast} from "sonner";
import {useUpdateProductMutation} from "#root/services/store/product";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField} from "#root/components/ui/form";
import {TextField, TextNumberField} from "#root/components/form/text-field";
import {z} from "zod";
import {Product} from "#root/services/schema/product";

type Props = {
	product: Product;
}

export function EditProductDialog({ product }: Props) {
	const [updateProduct, {isLoading}] = useUpdateProductMutation()
	const navigate = useNavigate()

	const onSubmit = (values: FormSchema) => {
		console.log(values)
		updateProduct({id: product.id, ...values})
			.unwrap()
			.then(() => {
				toast.success("Produit modifié avec succès")
			})
			.then(() => {
				navigate({ to: "." })
			})
			.catch(() => {
				toast.error("Erreur lors de la modification du produit")
			})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="h-8 w-8 p-0"
				>
					<EditIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Modifier produit</DialogTitle>
					<DialogDescription>
						Modifiez les informations du produit.
					</DialogDescription>
				</DialogHeader>
				<EditForm
					updateFn={onSubmit}
					defaultValues={{
						name: product.name,
						description: product.description,
						price: product.price,
					}}
					productId={product.id}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button>Annuler</Button>
					</DialogClose>
					<Button
						variant="secondary"
						disabled={isLoading}
						form={`edit-form-${product.id}`} // form id so I can define button outside the form and still have them linked
					>
						{isLoading && <Loader2 className="animate-spin" />}
						{isLoading ? "Modification en cours..." : "Confirmer la modification"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

const schema = z.object({
	name: z.string({
		required_error: "Le nom est obligatoire"
	})
		.min(3, "Le nom doit contenir au moins 3 caractères")
		.max(100, "Le nom doit contenir au maximum 100 caractères"),
	description: z.string().optional(),
	price: z.string({
		required_error: "Le prix est obligatoire"
	}).refine(value => {
		return !isNaN(parseFloat(value))
	}, "Le prix doit être un nombre")
		.transform(value => parseFloat(value))
		.refine(value => value > 0, "Le prix doit être positif")
})

type FormSchema = z.infer<typeof schema>

type EditFormProps = {
	defaultValues: Partial<FormSchema>
	productId: number;
	updateFn: (values: FormSchema) => void;
}

function EditForm({ defaultValues, productId, updateFn }: EditFormProps) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
		defaultValues,
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(updateFn)} className="space-y-8" id={`edit-form-${productId}`}>
				<FormField
					control={form.control}
					name="name"
					render={({field}) => (
						<TextField
							{...field}
							error={form.formState.errors.name?.message}
							label="Nouveau nom du produit"
						/>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({field}) => (
						<TextField
							{...field}
							error={form.formState.errors.description?.message}
							label="Description"
						/>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({field}) => (
						<TextNumberField
							{...field}
							step="any"
							error={form.formState.errors.price?.message}
							label="Prix"
						/>
					)}
				/>
			</form>
		</Form>
	)
}
