import {z} from "zod";
import {useCreateCategoryMutation} from "#root/services/store/category.ts";
import {useNavigate} from "@tanstack/react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormField} from "#root/components/ui/form.tsx";
import {TextField} from "#root/components/form/text-field.tsx";
import {Button} from "#root/components/ui/button.tsx";
import {Loader2} from "lucide-react";
import {H2} from "#root/components/ui/typography.tsx";
import {Category} from "#root/services/schema/category.ts";
import {Card, CardContent, CardHeader, CardTitle} from "#root/components/ui/card";

const schema = z.object({
	name: z.string({
		required_error: "Le nom est obligatoire"
	})
		.min(3, "Le nom doit contenir au moins 3 caractères")
		.max(100, "Le nom doit contenir au maximum 100 caractères")
		.describe("Nouveau nom de la catégorie"),
})

type FormSchema = z.infer<typeof schema>

export function CategoryNew() {
	const [createCategory, { isLoading }] = useCreateCategoryMutation()
	const navigate = useNavigate()
	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
	})

	const onSubmit = (values: FormSchema) => {
		createCategory(values)
			.unwrap()
			.then((res: Category) => navigate({ to: "/category/$categoryId", params: { categoryId: res.id.toString() } }))
			.catch(() => toast.error("Une erreur s'est produite lors de la création de la catégorie. Veuillez réessayer."))
	}

	return (
		<Card className="max-w-[600px] mx-auto">
			<CardHeader>
				<CardTitle>
					<H2>Ajouter une catégorie</H2>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({field}) => (
								<TextField
									{...field}
									error={form.formState.errors.name?.message}
									label="Nom de la catégorie"
								/>
							)}
						/>
						<Button type="submit" disabled={isLoading}>
							{isLoading && <Loader2 className="animate-spin" />}
							{isLoading ? "Création en cours..." : "Ajouter"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}