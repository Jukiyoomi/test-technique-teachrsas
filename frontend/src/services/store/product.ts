import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getProductsSchema, getOneProductSchema, type Product} from "#root/services/schema/product";

export const productApi = createApi({
	reducerPath: "product-api",
	baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_PUBLIC_API_URL}/product`}),
	tagTypes: ["product"],
	endpoints: (build) => ({
		getAllProducts: build.query<Product[], void>({
			query: () => "",
			transformResponse: (response: Product[]) => getProductsSchema.parse(response),
			providesTags: ["product"],
		}),
		getOneProduct: build.query<Product, number>({
			query: (id) => `/${id}`,
			transformResponse: (response: Product) => getOneProductSchema.parse(response),
			providesTags: ["product"],
		}),
		deleteProduct: build.mutation<void, number>({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["product"],
		}),
		updateProduct: build.mutation<Product, { id: number, name: string, description?: string|undefined, price: number }>({
			query: ({ id, name, description, price }) => ({
				url: `/${id}`,
				method: "PUT",
				body: { name, description, price },
			}),
			invalidatesTags: ["product"],
		}),
		createProduct: build.mutation<Product, { name: string, description?: string|undefined, price: number, categoryId: number }>({
			query: ({ name, description, price, categoryId }) => ({
				url: "",
				method: "POST",
				body: { name, description, price, categoryId },
			}),
			invalidatesTags: ["product"],
		})
	}),
})

export const { useGetAllProductsQuery, useDeleteProductMutation, useUpdateProductMutation, useCreateProductMutation } = productApi;