import type { PropsWithChildren } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import {queryClient} from "#root/services/react-query";


export type RootProps = PropsWithChildren;

export function Root({ children }: RootProps) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}