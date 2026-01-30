<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Category;

class PostSeeder extends Seeder
{
    public function run()
    {
        $posts = [
            [
                'title' => 'Laravel alapok',
                'content' => 'Ez egy Laravel alapokról szóló bejegyzés.'
            ],
            [
                'title' => 'Miért jó a many to many kapcsolat?',
                'content' => 'A pivot tábla az élet kulcsa.'
            ],
            [
                'title' => 'Frontend vs Backend',
                'content' => 'Örök vita, de mindkettő kell.'
            ],
            [
                'title' => 'REST API alapelvek',
                'content' => 'A REST nem varázslat, hanem szabályrendszer.'
            ],
            [
                'title' => 'Mi az MVC?',
                'content' => 'Model View Controller logika Laravelben.'
            ],
            [
                'title' => 'Miért fontos a validáció?',
                'content' => 'A backend nem bízhat a frontendben.'
            ],
            [
                'title' => 'Auth működése',
                'content' => 'Laravel auth alapfogalmak.'
            ],
            [
                'title' => 'Middleware szerepe',
                'content' => 'A middleware szűr és véd.'
            ],
            [
                'title' => 'Eloquent kapcsolatok',
                'content' => 'HasOne, HasMany, BelongsToMany.'
            ],
        ];

        $categories = Category::all();

        foreach ($posts as $postData) {
            $post = Post::create($postData);

            $post->categories()->attach(
                $categories->random(rand(1, 3))->pluck('id')->toArray()
            );
        }
    }
}
