<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with("Categories")->get();

        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "title" => "required|string",
            "content" => "required|string",

            'categories' => 'required|array|min:1',
            'categories.*' => 'integer',
        ]);

        $post = Post::create([
            "title" => $validated["title"],
            "content" => $validated["content"],
        ]);

        if ($post) {
            $post->categories()->sync($validated["categories"]);
        }

        $post = [$post, $post->categories];

        return response()->json($post[0]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            "title" => "required|string",
            "content" => "required|string",
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->noContent();
    }
}
