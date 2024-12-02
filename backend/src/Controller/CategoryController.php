<?php

namespace App\Controller;

use App\DTOs\CategoryDto;
use App\Service\CategoryService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;

class CategoryController extends AbstractController
{
	public function __construct(
		private readonly CategoryService $categoryService
	){}

	#[Route('/category', name: 'api.category.create', methods: ['POST'], format: 'json')]
	public function index(
		#[MapRequestPayload] CategoryDto $categoryDto
	): JsonResponse
	{
			$category = $this->categoryService->create($categoryDto);
			return $this->json($category, Response::HTTP_CREATED, [], ['groups' => 'category.read']);
	}

	#[Route('/category', name: 'api.category.find.all', methods: ['GET'])]
	public function findAll(): JsonResponse
	{
		$categories = $this->categoryService->findAll();
		return $this->json($categories, Response::HTTP_OK, [], ['groups' => 'category.read']);
	}

	#[Route('/category/{id}', name: 'api.category.find.one', requirements: ['id' => '\d+'], methods: ['GET'])]
	public function findOne(int $id): JsonResponse
	{
		$category = $this->categoryService->findOneById($id);
		if (!$category) {
			return $this->json([
				'message' => "La catégorie d'id $id n'existe pas."
			], Response::HTTP_NOT_FOUND);
		}
		return $this->json($category, Response::HTTP_OK, [], ['groups' => 'category.read']);
	}

	#[Route('/category/{id}', name: 'api.category.update', requirements: ['id' => '\d+'], methods: ['PUT'], format: 'json')]
	public function update(
		int $id,
		#[MapRequestPayload] CategoryDto $categoryDto
	): JsonResponse
	{
		$category = $this->categoryService->findOneById($id);
		if (!$category) {
			return $this->json([
				'message' => "La catégorie d'id $id n'existe pas."
			], Response::HTTP_NOT_FOUND);
		}
		$category->setName($categoryDto->name);
		$this->categoryService->update($category, $categoryDto);
		return $this->json($category, Response::HTTP_OK, [], ['groups' => 'category.read']);
	}

	#[Route('/category/{id}', name: 'api.category.delete', requirements: ['id' => '\d+'], methods: ['DELETE'], format: 'json')]
	public function delete(int $id): JsonResponse
	{
		$category = $this->categoryService->findOneById($id);
		$this->categoryService->delete($category);
		return $this->json([], Response::HTTP_NO_CONTENT);
	}
}
