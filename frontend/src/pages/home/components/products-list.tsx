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
import {
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel, getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel, type PaginationState,
	type SortingState,
	useReactTable
} from "@tanstack/react-table";
import {columns} from "./table-columns";
import {useState} from "react";
import {PaginationButtons, PaginationPageSize} from "#root/pages/home/components/pagination.tsx";
import {SearchBar} from "#root/pages/home/components/search-bar.tsx";

type Props = {
	products: Product[];
}

export function ProductsList({ products }: Props) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState<PaginationState>({
		pageSize: 1,
		pageIndex: 0,
	})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const table = useReactTable({
		data: products,
		columns,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			pagination,
			columnFilters
		},
	})

	const fake = [
		...table.getRowModel().rows,
	]

	return (
		<>
			<div className="flex flex-wrap items-center py-4 gap-3 w-full">
				<SearchBar
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(val) => table.getColumn("name")?.setFilterValue(val)}
				/>
				<PaginationPageSize pagination={pagination} onClick={(pageSize) => setPagination({...pagination, pageSize})}/>
			</div>
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
							fake.map((row) => (
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
						<TableCell colSpan={4}>Nombre de produits</TableCell>
						<TableCell className="text-right">{products.length} produits</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
			<PaginationButtons
				onPreviousPage={table.previousPage}
				onNextPage={table.nextPage}
				hasPreviousPage={table.getCanPreviousPage()}
				hasNextPage={table.getCanNextPage()}
				current={pagination.pageIndex + 1}
			/>
		</>
	)
}