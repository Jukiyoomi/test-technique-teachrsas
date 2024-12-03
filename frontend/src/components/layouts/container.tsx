import {PropsWithChildren} from "react";
import {Header} from "./header";

export const Container = ({ children }: PropsWithChildren) => (
	<>
		<Header />
		<main className="w-full mx-auto relative">
			<div className="container mx-auto  px-4 sm:px-6 lg:px-8">
				{children}
			</div>
		</main>
	</>
)