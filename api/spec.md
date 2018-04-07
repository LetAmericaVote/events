## Model Specs

**API Event**
```js
{
  "_id": "ObjectId(...)", // Indexed (default).
  "contentfulId": "...", // Indexed.
  "title": "...",
  "host": {
    "id": "...", // API User Id
  },
  "time": "...", // Would we need this indexed for sorting?
  "address": "...",
  "city": "...",
  "state": "...",
  "zipcode": "...",
  "geo": "?", // GEO Index.
}
```

**Algolia Event Index**
```js
{
  "id": "...", // Matches Event API Id.
  "contentfulId": "..." // Not searchable.
  "title": "...",
  "host": {
    "id": "..." // Matches User API Id, Not searchable.
    "firstName": "...",
    "lastName": "...",
  },
  "address": "...",
  "city": "...",
  "state": "...",
  "zipcode": "...",
}
```

**Contentful Fields**
- Title
- Slug
- Header photo(s)?
- Date + Time


**API User**
```js
{
  "_id": "ObjectId(...)", // Indexed (default).
  "firstName": "...",
  "lastName": "...",
  "profilePhoto": "...",
  "mobileCommonsProfileId": "...",
  "mobile": "...",
  "email": "...",
  "zipcode": "...",
  // Auth?
}
```

**API Signup**
```js
{
  "_id": "ObjectId(...)", // Indexed (default).

  /* Compound Index */
  "userId": "...", // Indexed.
  "eventId": "...", // Indexed.
}
```

**API Post**
```js
{
  "_id": "ObjectId(...)", // Indexed (default).
  "userId": "...", // Indexed.
  "content": "......",

  /* Compound Index */
  "eventId": "...", // Indexed.
  "createdAt": "...",

  /* Compound Index */
  "inReplyTo": "...",
  "createdAt": "...",
}
```


## Events

### I want to find an event by city, state, zip code, title, or the organizers name
Hit Algolia. Algolia document will have all of these fields.

### I want to find an event by lat/long (near me)
Hit API. API has a mongodb with geo index.

### I want to find an event I’ve already signed up for.
Hit API. API has a record of all event signups per user.

### I want to get a paginated list of events for a map
Hit API. API has a record of every event.

### I want to get content about an event
Hit Contentful. Contentful has content for every event.

### I want to update content for an event
Use Contentful. Contentful then uses Webhook to hit API. API makes updates to DB/Algolia. Client pulls in changes automatically.
