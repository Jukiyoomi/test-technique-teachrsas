<?php

namespace App\Tests\Service;

use App\DTOs\ProductDto;
use App\Entity\Product;
use App\Repository\ProductRepository;
use Faker\Factory;
use Faker\Generator;
use PHPUnit\Framework\MockObject\MockObject;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ProductServiceTest extends KernelTestCase
{
	protected function setUp(): void
	{
		self::bootKernel();
	}

	private function mockRepository(): MockObject
	{
		return $this->createMock(ProductRepository::class);
	}

	private function getService()
	{
		return static::getContainer()->get('App\Service\ProductService');
	}

	private function getFaker(): Generator
	{
		return Factory::create();
	}

	public function testCreateProduct(): void
	{
		$fakeRepository = $this->mockRepository();
		$fakeRepository->method('create')->willReturn(new Product());
		$faker = $this->getFaker();
		$productDto = new ProductDto(
			$faker->word(),
			$faker->sentence(10),
			$faker->randomFloat(2, 1, 1000),
			1
		);
		$productService = $this->getService();
		$product = $productService->create($productDto);
		$this->assertInstanceOf(Product::class, $product);
	}

	public function testGetProducts(): void
	{
		$fakeRepository = $this->mockRepository();
		$fakeRepository->method('findAll')->willReturn([new Product(), new Product(), new Product()]);
		$productService = $this->getService();
		$products = $productService->findAll();
		$this->assertIsArray($products);
		$this->assertContainsOnlyInstancesOf(Product::class, $products);
	}

	public function testGetProduct(): void
	{
		$fakeRepository = $this->mockRepository();
		$fakeRepository->method('findOneBy')->willReturn(new Product());
		$productService = $this->getService();
		$product = $productService->findOneById(1);
		$this->assertInstanceOf(Product::class, $product);
	}

	public function testUpdateProduct(): void
	{
		$fakeRepository = $this->mockRepository();
		$faker = $this->getFaker();
		$name = $faker->word();
		$productDto = new ProductDto(
			$name,
			$faker->sentence(10),
			$faker->randomFloat(2, 1, 1000),
			1
		);
		$product = new Product();
		$productService = $this->getService();
		$product = $productService->update($product, $productDto);;
		$this->assertSame($name, $product->getName());
	}

	public function testDeleteProduct(): void
	{
		$fakeRepository = $this->mockRepository();
		$fakeRepository->method('delete')->will($this->returnCallback(function($product) {
			$product->setId(null);
		}));
		$product = new Product();
		$productService = $this->getService();
		$productService->delete($product);
		$this->assertNull($product->getId());
	}
}