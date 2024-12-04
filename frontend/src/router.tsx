import {
	createRootRouteWithContext,
	createRoute,
	createRouter, notFound,
	Outlet
} from "@tanstack/react-router";
import {lazy, Suspense} from "react";
import { Root } from "#root/root";
import {Container} from "#root/components/layouts/container.tsx";
import { Home } from "#root/pages/home";
import { categoryApi } from "#root/services/store/category";
import { store } from "#root/services/store";
import { CategoryDetails } from "#root/pages/category-details";
import { NotFound } from "#root/pages/not-found";

// Get devtools only in developement environment
const TanStackRouterDevtools = import.meta.env.DEV
	? lazy(() =>
		import("@tanstack/router-devtools").then((res) => ({
			default: res.TanStackRouterDevtools,
		})),
	)
	: () => null;

const rootRoute = createRootRouteWithContext()({
	component: () => (
		<Root>
			<Outlet />
			<Suspense>
				<TanStackRouterDevtools />
			</Suspense>
		</Root>
	),
	head: () => {
		return {
			meta: [{ title: "Test Technique" }],
		};
	},
	loader: async () => { //preloading categories so they can be available before rendering the app
		const { data } = await store.dispatch(categoryApi.endpoints.getAllCategories.initiate());
		console.log(data);
		return data;
	},
});

// Routes defs
const containerRoute = createRoute({
	id: "container",
	getParentRoute: () => rootRoute,
	component: () => (
		<Container>
			<Outlet />
		</Container>
	),
})

const baseRoute = createRoute({
	path: "/",
	getParentRoute: () => containerRoute,
	component: () => <Home />,
})

const categoryDetailsRoute = createRoute({
	path: "/category/$categoryId",
	loader: async ({ params }) => {
		const { data } = await store.dispatch(categoryApi.endpoints.getOneCategory.initiate(Number(params.categoryId)));
		if (!data) throw notFound();
		console.log(data);
		return data;
	},
	getParentRoute: () => containerRoute,
	component: () => <CategoryDetails />,
})

// Route Tree
const routeTree = rootRoute.addChildren([
	containerRoute.addChildren([
		baseRoute,
		categoryDetailsRoute
	])
]);

// Final router and type declaration (because type safety is life)
export const router = createRouter({
	routeTree,
	defaultNotFoundComponent: () => <NotFound />,
	defaultPreload: "viewport",
	defaultPreloadStaleTime: 1000 * 60 * 60 * 24,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}