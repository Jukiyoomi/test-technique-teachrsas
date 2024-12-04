import {z} from "zod";
import {useCreateProductMutation} from "#root/services/store/product.ts";
import {getRouteApi, useNavigate} from "@tanstack/react-router";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Card, CardContent, CardHeader, CardTitle} from "#root/components/ui/card.tsx";
import {H2} from "#root/components/ui/typography.tsx";
import {Form, FormField} from "#root/components/ui/form.tsx";
import {TextField, TextNumberField} from "#root/components/form/text-field.tsx";
import {Button} from "#root/components/ui/button.tsx";
import {Loader2} from "lucide-react";
import {SelectField} from "#root/components/form/select-field.tsx";

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
		.refine(value => value > 0, "Le prix doit être positif"),
	categoryId: z.string({
		required_error: "La catégorie est obligatoire"
	})
})

type FormSchema = z.infer<typeof schema>

export function ProductNew() {
	const route = getRouteApi('/container/product/new')
	const data = route.useLoaderData()
	const [createProduct, {isLoading}] = useCreateProductMutation()
	const navigate = useNavigate()
	const form = useForm<FormSchema>({
		resolver: zodResolver(schema),
	})

	const onSubmit = (values: FormSchema) => {
		console.log(values)
		createProduct({
			name: values.name,
			description: values.description,
			price: values.price,
			categoryId: parseInt(values.categoryId)
		})
			.unwrap()
			.then(() => navigate({ to: "/" } ))
			.catch(() => toast.error("Une erreur s'est produite lors de la création de la catégorie. Veuillez réessayer."))
	}

	return (
		<Card className="max-w-[600px] mx-auto">
			<CardHeader>
				<CardTitle>
					<H2>Ajouter un produit</H2>
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
									label="Nom du produit"
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
									error={form.formState.errors.price?.message}
									label="Prix"
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							render={({field}) => (
								<SelectField placeholder={"Sélectionner la catégorie à associer"} {...field}>
									{data?.map((category) => category.name)}
								</SelectField>
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