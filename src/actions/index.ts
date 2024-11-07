import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { getStore } from "@netlify/blobs";

export const server = {
  storeCalculator: defineAction({
    handler: async (input) => {
        const store = getStore('calculator');
        const json = await input.json();
        store.set(input.id, input);
        console.log(input.id)
      return `Hello, ${input}!`
    }
  })
}