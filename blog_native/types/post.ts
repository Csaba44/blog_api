/*[
    {
        "id": 3,
        "title": "Lorem Ipsum",
        "content": "Halo halo halo",
        "created_at": "2026-01-30T10:19:55.000000Z",
        "updated_at": "2026-01-30T10:19:55.000000Z",
        "categories": [
            {
                "id": 1,
                "name": "Lorem",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 3,
                    "category_id": 1
                }
            },
            {
                "id": 2,
                "name": "Ipsum",
                "created_at": null,
                "updated_at": null,
                "pivot": {
                    "post_id": 3,
                    "category_id": 2
                }
            }
        ]
    },
]*/
export type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  categories: Category[];
};
