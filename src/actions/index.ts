import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { getStore } from "@netlify/blobs";

export const server = {
  storeCalculator: defineAction({

    handler: async (input) => {
        const store = getStore('calculator');

        store.set(input.id, JSON.stringify(input));
        return {id: input.id};
    }
  })
}