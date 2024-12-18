import {
	Select,
	SelectContent,
	SelectGroup, SelectItem,
	SelectTrigger,
	SelectValue
} from "#root/components/ui/select";
import type {PaginationState} from "@tanstack/react-table";
import {Button} from "#root/components/ui/button.tsx";
import {Paragraph} from "#root/components/ui/typography";

type PaginationPageSizeProps = {
	pagination: PaginationState;
	onClick: (pageSize: number) => void;
}

export function PaginationPageSize({ pagination, onClick }: PaginationPageSizeProps) {
	 return (
		 <Select
		 	onValueChange={(value) => onClick(Number(value))}
		 >
			 <SelectTrigger className="flex-1">
				 <SelectValue placeholder="Taille de la pagination" />
			 </SelectTrigger>
			 <SelectContent>
				 <SelectGroup>
					 <SelectItem value="1" disabled={pagination.pageSize === 1}>1 par page</SelectItem>
					 <SelectItem value="5" disabled={pagination.pageSize === 5}>5 par page</SelectItem>
					 <SelectItem value="10" disabled={pagination.pageSize === 10}>10 par page</SelectItem>
				 </SelectGroup>
			 </SelectContent>
		 </Select>
	 )
}

type PaginationButtonsProps = {
	onPreviousPage: () => void;
	onNextPage: () => void;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
	current: number
}

export function PaginationButtons({ onPreviousPage, onNextPage, hasPreviousPage, hasNextPage, current }: PaginationButtonsProps) {
	return (
		<div className="flex items-center space-x-2 py-4">
			<Button
				variant="outline"
				size="sm"
				onClick={onPreviousPage}
				disabled={!hasPreviousPage}
			>
				Page précédente
			</Button>
			<Paragraph unspaced>Page {current}</Paragraph>
			<Button
				variant="outline"
				size="sm"
				onClick={onNextPage}
				disabled={!hasNextPage}
			>
				Page suivante
			</Button>
		</div>
	)
}