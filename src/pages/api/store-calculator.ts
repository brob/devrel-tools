import { getStore } from "@netlify/blobs";
import type { APIRoute } from "astro";
import { jsx } from "react/jsx-runtime";
export const prerender = false
export const POST: APIRoute = async ({request, redirect}) => {
    const body = await request.json();
    console.log({body})

    const store = getStore('calculator');
    console.log(store)
    // const json = await input.json();
    store.set(body.id, JSON.stringify(body));
    const storeData = await store.get(body.id);
    console.log({storeData})
  return new Response(JSON.stringify({id: body.id}));

};