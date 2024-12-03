import {H1, Paragraph} from "#root/components/ui/typography";
import {getRouteApi, Link} from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuTrigger,
} from "#root/components/ui/navigation-menu";

export const Header = () => {
	const routeApi = getRouteApi('__root__')
	const data = routeApi.useLoaderData()

	return (
		<header className="flex items-center justify-between p-4 w-full mb-5 shadow">
			<Link to="/">
				<H1>Proproducts</H1>
			</Link>

				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Nos Catégories</NavigationMenuTrigger>
							<NavigationMenuContent>
								{
									data ? (
										data.map((category) => (
											<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
												<li className="row-span-3">
													<NavigationMenuLink key={category.id} asChild>
														<Link to="/category/$categoryId" params={{categoryId: category.id.toString()}}>
															{category.name}
														</Link>
													</NavigationMenuLink>
												</li>
											</ul>
										))
									) :
									<Paragraph>Pas de catégories</Paragraph>
								}
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
		</header>
	)
}