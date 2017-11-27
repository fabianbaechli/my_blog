# my_blog API
__IN PROGRESS__

## GET `entries`
- __Purpose:__ Get's all posts
- __Response:__
```json
[
  {
    "id": 0,
    "content": {
      "header": "# lorem",  
      "body": "## Ipsum",
      "tags": ["first_post", "programming"]
    }
  }
]
```

## POST `alter_entry`
- __Purpose:__ Changes the content of an entry, if the user is authenticated as admin
- __Request:__
```json
{
  "entry_id": 0,
  "changed_content": {
    "header": "new_header",
    "body": "new_content",
    "tags": ["my_first_altered_entry"]
  }
}
```

- __Response:__
  - _If admin:_ `{success: true}`
  - _Else:_ `{success: false}`
