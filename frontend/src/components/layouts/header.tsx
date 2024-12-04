import {H1, Paragraph} from "#root/components/ui/typography";
import {Link} from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuTrigger,
} from "#root/components/ui/navigation-menu";
import {useGetAllCategoriesQuery} from "#root/services/store/category.ts";

export const Header = () => {
	const { data, isLoading } = useGetAllCategoriesQuery();
	return (
		<header className="flex items-center justify-between p-4 w-full mb-5 shadow">
			<Link to="/">
				<H1>Proproducts</H1>
			</Link>

			<NavigationMenu>
				<NavigationMenuList className="flex items-center gap-4">
					{
						isLoading ? (
							<Paragraph unspaced>Chargement des catégories...</Paragraph>
						) : (
							<NavigationMenuItem>
								<NavigationMenuTrigger>Nos Catégories</NavigationMenuTrigger>
								<NavigationMenuContent>
									{
										data ? (
											<ul className="flex flex-col p-4 w-[200px]">
												{data.map((category) => (
														<li className="w-full" key={category.id}>
															<NavigationMenuLink>
																<Link
																	to="/category/$categoryId"
																	params={{categoryId: category.id.toString()}}
																	className="w-full block py-1 px-3 rounded hover:bg-primary hover:text-background transition-colors"
																>
																	{category.name}
																</Link>
															</NavigationMenuLink>
														</li>
													))}
											</ul>
											) :
											<Paragraph>Pas de catégories</Paragraph>
									}
								</NavigationMenuContent>
							</NavigationMenuItem>
						)
					}
					<NavigationMenuItem>
						<NavigationMenuTrigger>Ajouter...</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="flex flex-col p-4 w-[200px]">
								<li className="w-full">
									<NavigationMenuLink asChild>
										<Link
											to="/category/new"
											className="w-full block py-1 px-3 rounded hover:bg-primary hover:text-background transition-colors"
										>Une catégorie</Link>
									</NavigationMenuLink>
								</li>

								<li>
									<NavigationMenuLink asChild>
										<Link
											className="w-full block py-1 px-3 rounded hover:bg-primary hover:text-background transition-colors"
											to="/product/new"
										>Un produit</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}