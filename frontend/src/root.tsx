import type { PropsWithChildren } from "react";
import {store} from "#root/services/store";
import {Provider} from "react-redux";


export type RootProps = PropsWithChildren;

export function Root({ children }: RootProps) {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
}