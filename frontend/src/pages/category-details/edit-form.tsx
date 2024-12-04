
import {z} from "zod";
import {Button} from "#root/components/ui/button";
import {Form, FormField} from "#root/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextField} from "#root/components/form/text-field";
import {useUpdateCategoryMutation} from "#root/services/store/category";
import {Loader2} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";
import {toast} from "sonner";

const schema = z.object({
	name: z.string({
		required_error: "Le nom est obligatoire"
	})
		.min(3, "Le nom doit contenir au moins 3 caractères")
		.max(100, "Le nom doit contenir au maximum 100 caractères")
		.describe("Nouveau nom de la catégorie"),
})

type FormSchema = z.infer<typeof schema>

type EditFormProps = {
	defaultValues: Partial<FormSchema>
	categoryId: number;
}
export function EditForm({ defaultValues, categoryId }: EditFormProps) {
	const [updateCategory, { isLoading }] = useUpdateCategoryMutation()
	const navigate = useNavigate()
	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
		defaultValues,
	})

	const onSubmit = (values: FormSchema) => {
		console.log(values)
		updateCategory({
			...values,
			id: categoryId
		})
			.unwrap()
			.then(() => toast.success("La catégorie a été modifiée avec succès."))
			.then(() => navigate({ to: "." })) // reloads the page
			.catch(() => toast.error("Une erreur s'est produite lors de la modification de la catégorie. Veuillez réessayer."))
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({field}) => (
						<TextField
							{...field}
							error={form.formState.errors.name?.message}
							label="Nouveau nom de la catégorie"
						/>
					)}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading && <Loader2 className="animate-spin" />}
					{isLoading ? "Modification en cours..." : "Modifier"}
				</Button>
			</form>
		</Form>
	)
}