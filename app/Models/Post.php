<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    protected $fillable = [
        "title",
        "content"
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, "post_category");
    }
}
