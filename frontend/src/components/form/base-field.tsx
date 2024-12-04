import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "#root/components/ui/form";
import type {PropsWithChildren} from "react";

export type BaseFieldProps = {
	error?: string;
	label?: string;
	helperText?: string;
	id?: string;
};

export function BaseField({ error, label, helperText, id, children }: PropsWithChildren<BaseFieldProps>) {
	return (
		<FormItem>
			<FormLabel htmlFor={id}>{label}</FormLabel>
			<FormControl>
				{children}
			</FormControl>
			<FormDescription>{helperText}</FormDescription>
			<FormMessage>{error}</FormMessage>
		</FormItem>
	);
}