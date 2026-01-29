export async function onRequestGet({ params, env, request }) {
  // /media/<key...> -> fetch from R2
  const key = (params?.path || []).join("/");
  if (!key) return new Response("Bad Request", { status: 400 });

  const obj = await env.MEDIA_BUCKET.get(key);
  if (!obj) return new Response("Not Found", { status: 404 });

  const headers = new Headers();
  // Preserve content-type and other metadata if present
  obj.writeHttpMetadata(headers);
  headers.set("etag", obj.httpEtag);

  // Long cache for versioned/static assets.
  // If you overwrite same key frequently, change max-age to smaller.
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(obj.body, { headers });
}
