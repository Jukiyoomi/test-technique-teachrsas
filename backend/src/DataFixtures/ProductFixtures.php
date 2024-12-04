<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Service\ProductService;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ProductFixtures extends Fixture
{
	public function __construct(
		private readonly ProductService $service
	){}

	public function load(ObjectManager $manager): void
	{
		$faker = Factory::create();

		for ($i = 0; $i < 50; $i++) {
			$user = new Product();
			$user->setName($i . $faker->word());
			$user->setDescription($faker->text());
			$user->setPrice($faker->randomFloat(2, 0, 1000));
			$user->setCategory($this->getReference('category_' . $faker->numberBetween(0, 9),Category::class));
			$manager->persist($user);
			$manager->flush();
		}
	}

	public function getDependencies(): array
	{
		return [
			CategoryFixtures::class,
		];
	}
}
