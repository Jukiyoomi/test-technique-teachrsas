<?php

namespace App\DTOs;

use Symfony\Component\Validator\Constraints as Assert;

class ProductDto
{
	public function __construct(
		#[Assert\NotBlank(
			message: "Le nom de la catégorie est obligatoire."
		)]
		#[Assert\Length(
			min: 3,
			max: 100,
			minMessage: "Le nom de la catégorie doit contenir au moins {{ limit }} caractères.",
			maxMessage: "Le nom de la catégorie doit contenir au maximum {{ limit }} caractères."
		)]
		public readonly string $name,

		public readonly ?string $description,

		#[Assert\NotBlank(
			message: "Le prix de la catégorie est obligatoire."
		)]
		#[Assert\Positive(
			message: "Le prix de la catégorie doit être un nombre positif."
		)]
		public readonly float $price,

		public readonly ?int $categoryId = null
	){}
}