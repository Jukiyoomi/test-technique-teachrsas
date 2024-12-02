<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Product
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
		#[Groups(['product.read', 'category.read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
		#[Groups(['product.read', 'category.read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
		#[Groups(['product.read'])]
    private ?string $description = null;

    #[ORM\Column]
		#[Groups(['product.read', 'category.read'])]
    private ?float $price = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
		#[Groups(['product.read'])]
    private ?Category $category = null;

		#[ORM\Column(type: 'datetime_immutable')]
		#[Groups(['product.read'])]
		private DateTimeImmutable $createdAt;

		#[ORM\Column(type: 'datetime_immutable')]
		#[Groups(['product.read'])]
		private DateTimeImmutable $updatedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

		#[ORM\PrePersist]
		public function setCreatedAt(): void
		{
			$this->createdAt = new DateTimeImmutable();
		}

		#[ORM\PreUpdate]
		#[ORM\PrePersist]
		public function setUpdatedAt(): void
		{
			$this->updatedAt = new DateTimeImmutable();
		}

		public function getCreatedAt(): ?DateTimeImmutable
		{
			return $this->createdAt;
		}

		public function getUpdatedAt(): ?\DateTimeImmutable
		{
			return $this->updatedAt;
		}

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }
}
