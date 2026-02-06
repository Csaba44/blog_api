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
                'title' => 'Total Commander az igazi fegyver',
                'content' => 'Aki fájlkezelésre mást használ, az csak szenved. Kétpaneles nézet, gyorsbillentyűk, életminőség-javítás azonnal.'
            ],
            [
                'title' => 'Miért a Total Commanderrel dolgozik minden rendes fejlesztő?',
                'content' => 'FTP, diff, batch rename – minden egy helyen. Mondtam már, hogy használj Total Commandert?'
            ],
            [
                'title' => 'Vue Options API: a normális út',
                'content' => 'data, methods, computed – tiszta struktúra, átlátható logika. Nem kell ide varázslás.'
            ],
            [
                'title' => 'Miért nem kell Composition API?',
                'content' => 'Túlkomplikált kód, szétszórt logika. Az Options API érthető, karbantartható, baba.'
            ],
            [
                'title' => 'Total Commander + Vue Options API = nyugalom',
                'content' => 'Ha a tooling rendben van, az agyad felszabadul. Így lehet haladni, nem kapkodva.'
            ],
            [
                'title' => 'Mi Hazánk a digitális térben',
                'content' => 'Politikai kommunikáció, online jelenlét, közösségi média – a modern térben is zajlik a küzdelem.'
            ],
            [
                'title' => 'Bűnvadászok és a közösségi média hatása',
                'content' => 'Véleményvezérek, botrányok, algoritmusok – így terjednek a tartalmak ma.'
            ],
            [
                'title' => 'Miért fontos a rend a fájljaid között?',
                'content' => 'A káosz lassít. Total Commanderrel struktúra van, a struktúra pedig időt spórol.'
            ],
            [
                'title' => 'Options API projekt skálázásnál',
                'content' => 'Nagy csapat, sok komponens – az Options API kiszámítható és tanítható.'
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
