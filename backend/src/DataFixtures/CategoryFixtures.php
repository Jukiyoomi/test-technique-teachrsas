<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
				$faker = Factory::create();
				for ($i = 0; $i < 10; $i++) {
					$category = new Category();
					$category->setName($i . $faker->word());
					$manager->persist($category);
					$manager->flush();
					$this->addReference('category_' . $i, $category); // adds a reference to the manager so I can access it in another fixture
				}
    }
}
