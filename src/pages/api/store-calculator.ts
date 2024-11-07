import { getStore } from "@netlify/blobs";
import type { APIRoute } from "astro";
export const prerender = false
export const POST: APIRoute = async ({request, redirect}) => {
    const body = await request.json();
    console.log(body)
    const store = getStore('calculator');
    console.log(store)
    // const json = await input.json();
    store.set(body.id, body);

  return new Response(JSON.stringify({id: body.id}));

};