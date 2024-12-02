<?php

namespace App\Tests\Service;

use App\DTOs\CategoryDto;
use App\Entity\Category;
use App\Repository\CategoryRepository;
use Faker\Factory;
use Faker\Generator;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class CategoryServiceTest extends KernelTestCase
{
	protected function setUp(): void
	{
		self::bootKernel();
	}

	private function mockRepository(): MockObject
	{
		return $this->createMock(CategoryRepository::class);
	}

	private function getService()
	{
		return static::getContainer()->get('App\Service\CategoryService');
	}

	private function getFaker(): Generator
	{
		return Factory::create();
	}

	public function testCreateCategory(): void
	{
		$fakeRepository = $this->mockRepository();
		$fakeRepository->method('create')->willReturn(new Category());
		$faker = $this->getFaker();
		$name = $faker->word();
		$categoryDto = new CategoryDto($name);
		$categoryService = $this->getService();
		$category = $categoryService->create($categoryDto);
		$this->assertSame($name, $category->getName());
	}

	public function testGetCategories(): void
	{
		$fakeRepository = $this->mockRepository();
		$fakeRepository->method('findAll')->willReturn([new Category(), new Category(), new Category()]);
		$categoryService = $this->getService();
		$categories = $categoryService->findAll();
		$this->assertIsArray($categories);
		$this->assertContainsOnlyInstancesOf(Category::class, $categories);
	}

	public function testGetCategory(): void
	{
		$fakeRepository = $this->mockRepository();
		$fakeRepository->method('findOneBy')->willReturn(new Category());
		$categoryService = $this->getService();
		$category = $categoryService->findOneById(1);
		$this->assertInstanceOf(Category::class, $category);
	}

	public function testUpdateCategory(): void
	{
		$fakeRepository = $this->mockRepository();
		$faker = $this->getFaker();
		$name = $faker->word();
		$categoryDto = new CategoryDto($name);
		$category = new Category();
		$categoryService = $this->getService();
		$category = $categoryService->update($category, $categoryDto);
		$this->assertSame($name, $category->getName());
	}

	public function testDeleteCategory(): void
	{
		$fakeRepository = $this->mockRepository();
		$fakeRepository->method('delete')->will($this->returnCallback(function($category) {
			$category->setId(null);
		}));
		$category = new Category();
		$categoryService = $this->getService();
		$categoryService->delete($category);
		$this->assertNull($category->getId());
	}
}