import {Children, ComponentProps, forwardRef, PropsWithChildren} from "react";
import {useController} from "react-hook-form";
import {BaseField, type BaseFieldProps} from "#root/components/form/base-field.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "#root/components/ui/select";

type SelectFieldProps = ComponentProps<typeof Select> & BaseFieldProps & {
	placeholder: string;
}

export const SelectField = forwardRef<unknown, PropsWithChildren<SelectFieldProps>>(({helperText, value, placeholder, error, children, ...props}, _ref) => {
	const { field } = useController({ name: props.name! });

	const wrappedChildren = Children.map(children, (child) => {
		if (!child) return null;
		return <SelectItem value={child.toString()}>{child}</SelectItem>
	})

	return (
		<BaseField
			error={error}
			helperText={helperText}
			id={field.name}
		>
			<Select
				value={field.value ?? ""}
				onValueChange={(value) => field.onChange(value)}
				disabled={field.disabled}
				{...props}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>{wrappedChildren}</SelectGroup>
				</SelectContent>
			</Select>
		</BaseField>
	)
})