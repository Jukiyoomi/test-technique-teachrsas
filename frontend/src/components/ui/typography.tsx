import { PropsWithChildren } from "react";

export function H1({ children }: PropsWithChildren) {
	return (
		<h1 className="text-primary scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			{children}
		</h1>
	);
}

export function H2({ children }: PropsWithChildren) {
	return (
		<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
			{children}
		</h2>
	);
}

export function Paragraph({ children }: PropsWithChildren) {
	return (
		<p className="leading-7 [&:not(:first-child)]:mt-6">
			{children}
		</p>
	);
}

export function LargeText({ children }: PropsWithChildren) {
	return (
		<p className="text-lg font-semibold">{children}</p>
	)
}

export function Small({children}: PropsWithChildren) {
	return (
		<small className="text-sm font-medium leading-none">{children}</small>
	);
}