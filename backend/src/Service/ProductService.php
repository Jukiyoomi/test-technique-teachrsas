<?php

namespace App\Service;

use App\DTOs\ProductDto;
use App\Entity\Category;
use App\Entity\Product;
use App\Repository\ProductRepository;

class ProductService
{
	public function __construct(
		private readonly ProductRepository $productRepository,
		private readonly CategoryService $categoryService,
	){}

	public function create(ProductDto $categoryDto): Product
	{
		$category = new Product();
		$category->setName($categoryDto->name);
		$category->setDescription($categoryDto->description);
		$category->setPrice($categoryDto->price);
		$category->setCategory($this->getCategory($categoryDto->categoryId));
		$this->productRepository->create($category);
		return $category;
	}

	private function getCategory(int $id): Category
	{
		return $this->categoryService->findOneById($id);
	}

	/**
	 * @return Product[]
	 */
	public function findAll(): array
	{
		return $this->productRepository->findAll();
	}

	public function findOneById(int $id): ?Product
	{
		return $this->productRepository->findOneBy(['id' => $id]);
	}

	public function update(Product $product, ProductDto $productDto): Product
	{
		$product->setName($productDto->name);
		$product->setDescription($productDto->description);
		$product->setPrice($productDto->price);
		if ($productDto->categoryId) {
			$product->setCategory($this->getCategory($productDto->categoryId));
		}
		$this->productRepository->update();
		return $product;
	}

	public function delete(?Product $product): void
	{
		if (!$product) { // without this check, it might throw an error, no need to receive an error for this operation
			return;
		}
		$this->productRepository->delete($product);
	}
}