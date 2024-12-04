<?php

namespace App\Controller;

use App\DTOs\ProductDto;
use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class ProductController extends AbstractController
{
	public function __construct(
		private readonly ProductService $productService
	){}

	#[Route('/product', name: 'api.product.create', methods: ['POST'], format: 'json')]
	public function create(
		#[MapRequestPayload] ProductDto $productDto
	): JsonResponse
	{
		$product = $this->productService->create($productDto);
		return $this->json($product, Response::HTTP_CREATED, [], ['groups' => 'product.read']);
	}

	#[Route('/product', name: 'api.product.find.all', methods: ['GET'])]
	public function findAll(): JsonResponse
	{
		$products = $this->productService->findAll();
		return $this->json($products, Response::HTTP_OK, [], ['groups' => 'product.read']);
	}

	#[Route('/product/{id}', name: 'api.product.find.one', methods: ['GET'])]
	public function findOneById(int $id): JsonResponse
	{
		$product = $this->productService->findOneById($id);
		if ($product === null) {
			return $this->json([
				'message' => "Product with id $id not found"
			], Response::HTTP_NOT_FOUND);
		}
		return $this->json($product, Response::HTTP_OK, [], ['groups' => 'product.read']);
	}

	#[Route('/product/{id}', name: 'api.product.update', methods: ['PUT'], format: 'json')]
	public function update(
		int $id,
		#[MapRequestPayload] ProductDto $productDto
	): JsonResponse
	{
		$product = $this->productService->findOneById($id);
		if ($product === null) {
			return $this->json(['message' => 'Product not found'], Response::HTTP_NOT_FOUND);
		}
		$this->productService->update($product, $productDto);
		return $this->json($product, Response::HTTP_OK, [], ['groups' => 'product.read']);
	}

	#[Route('/product/{id}', name: 'api.product.delete', methods: ['DELETE'])]
	public function delete(int $id): JsonResponse
	{
		$product = $this->productService->findOneById($id);
		if ($product === null) {
			return $this->json([
				'message' => "Product with id $id not found"
			], Response::HTTP_NOT_FOUND);
		}
		$this->productService->delete($product);
		return $this->json([], Response::HTTP_NO_CONTENT);
	}
}
