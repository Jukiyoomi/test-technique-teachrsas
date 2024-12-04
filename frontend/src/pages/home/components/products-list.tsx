import type {Product} from "#root/services/schema/product";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from "#root/components/ui/table";
import {LargeText} from "#root/components/ui/typography";
import {flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable} from "@tanstack/react-table";
import {columns} from "./table-columns";
import {useState} from "react";

type Props = {
	products: Product[];
}

export function ProductsList({ products }: Props) {
	const [sorting, setSorting] = useState<SortingState>([])
	const table = useReactTable({
		data: products,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	})

	return (
		<Table>
			<TableCaption>
				Liste de nos super produits
			</TableCaption>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
								</TableHead>
							)
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{
					table.getRowModel().rows?.length > 0 ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() ? "selected" : undefined}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={4}>
								<LargeText>Aucun produit trouvé</LargeText>
							</TableCell>
						</TableRow>
					)
				}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Nombre de produits</TableCell>
					<TableCell className="text-right">{products.length} produits</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}