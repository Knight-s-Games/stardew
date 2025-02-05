import { NormalFishList } from '$lib';
import type { PageLoad } from './$types';

export const load = (async () => {
  return {
    fishes: NormalFishList
  };
}) satisfies PageLoad;