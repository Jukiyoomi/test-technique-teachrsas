import {Input} from "#root/components/ui/input";
import {ComponentProps, forwardRef} from "react";
import {BaseField, BaseFieldProps} from "#root/components/form/base-field";
import {useController} from "react-hook-form";

export type TextFieldBaseProps = ComponentProps<"input"> & BaseFieldProps;

export const TextField = forwardRef<unknown, TextFieldBaseProps>(({label, helperText, error, ...props}, _ref) => {
	const { field } = useController({ name: props.name! });
	return (
		<BaseField
			error={error}
			label={label}
			helperText={helperText}
			id={field.name}
		>
			<Input
				ref={field.ref}
				id={field.name}
				value={field.value ?? ""}
				onChange={(e) => field.onChange(e.target.value)}
				onBlur={field.onBlur}
				disabled={field.disabled}
				{...props}
			/>
		</BaseField>
	)
})

export function PasswordField(props: TextFieldBaseProps) {
	return <TextField {...props} type="password" />;
}

export function TextNumberField(props: TextFieldBaseProps) {
	return <TextField {...props} type="number" />;
}