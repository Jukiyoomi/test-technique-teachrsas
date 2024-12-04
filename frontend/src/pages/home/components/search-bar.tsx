import {Input} from "#root/components/ui/input";

type Props = {
	value: string
	onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
	return (
		<Input
			placeholder="Rechercher par nom"
			value={value}
			onChange={(event) => onChange(event.target.value)}
			className="flex-[4] min-w-[300px]"
		/>
	)
}