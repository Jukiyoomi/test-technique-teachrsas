import {createRootRouteWithContext, createRoute, createRouter, Outlet} from "@tanstack/react-router";
import {lazy, Suspense} from "react";
import { Root } from "#root/root";
import App from "#root/App.tsx";

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
});

// Routes defs
const baseRoute = createRoute({
	path: "/",
	getParentRoute: () => rootRoute,
	component: App,
})

// Route Tree
const routeTree = rootRoute.addChildren([
	baseRoute
]);

// Final router and type declaration (because type safety is life)
export const router = createRouter({
	routeTree,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}