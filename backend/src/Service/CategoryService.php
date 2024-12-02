<?php

namespace App\Service;

use App\DTOs\CategoryDto;
use App\Entity\Category;
use App\Repository\CategoryRepository;

class CategoryService
{
	public function __construct(
		private readonly CategoryRepository $categoryRepository
	){}

	public function create(CategoryDto $categoryDto): Category
	{
		$category = new Category();
		$category->setName($categoryDto->name);
		$this->categoryRepository->create($category);
		return $category;
	}

	/**
	 * @return Category[]
	 */
	public function findAll(): array
	{
		return $this->categoryRepository->findAll();
	}

	public function findOneBy(int $id): ?Category
	{
		return $this->categoryRepository->findOneBy(['id' => $id]);
	}

	public function update(Category $category, CategoryDto $categoryDto): Category
	{
		$category->setName($categoryDto->name);
		$this->categoryRepository->update();
		return $category;
	}

	public function delete(?Category $category): void
	{
		if (!$category) {
			return;
		}
		$this->categoryRepository->delete($category);
	}
}