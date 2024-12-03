import { configureStore } from '@reduxjs/toolkit'
import { productApi } from "./product";
import { categoryApi } from "./category";

export const store = configureStore({
	reducer: {
		[productApi.reducerPath]: productApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
		.concat(productApi.middleware)
		.concat(categoryApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch