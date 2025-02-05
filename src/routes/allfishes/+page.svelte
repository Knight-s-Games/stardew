<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let season = $state('');
	let location = $state('');

	let filteredFishes = $derived(
		data.fishes.filter(
			(i) =>
				i.Season.join(" ").toLowerCase().includes(season.toLowerCase()) &&
				i.Location.toLowerCase().includes(location.toLowerCase())
		).sort((a,b)=> a.Name.localeCompare(b.Name))
	);
</script>

<svelte:head>
  <title>Fish - Stardew Valley</title>
</svelte:head>

<div class="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <!-- Input Fields -->
  <div class="flex flex-col sm:flex-row gap-4 mb-6">
    <div class="flex flex-col w-full">
      <label for="season" class="text-gray-700 font-semibold mb-1">Season</label>
      <input 
        type="text" 
        bind:value={season} 
        id="season" 
        class="border rounded-md px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
        placeholder="Enter season..."
      />
    </div>
    <div class="flex flex-col w-full">
      <label for="location" class="text-gray-700 font-semibold mb-1">Location</label>
      <input 
        type="text" 
        bind:value={location} 
        id="location" 
        class="border rounded-md px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
        placeholder="Enter location..."
      />
    </div>
  </div>

  <!-- Fish Table -->
  <div class="overflow-x-auto">
    <table class="w-full border-collapse border border-gray-300 shadow-md">
      <thead class="bg-blue-500 text-white">
        <tr>
          <th class="p-3 border">Image</th>
          <th class="p-3 border">Name</th>
          <th class="p-3 border">Description</th>
          <th class="p-3 border">Season</th>
          <th class="p-3 border">Location</th>
          <th class="p-3 border">Weather</th>
          <th class="p-3 border">Time</th>
          <th class="p-3 border">Base Price</th>
          <th class="p-3 border">Base XP</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        {#each filteredFishes as fish (fish.Position)}
          <tr class="hover:bg-gray-100 transition">
            <td class="p-2 border">
              <img src={fish.Thumbnail} alt={fish.Name} class="w-12 h-12 object-cover rounded" />
            </td>
            <td class="p-2 border font-semibold">{fish.Name}</td>
            <td class="p-2 border">{fish.Description}</td>
            <td class="p-2 border">{fish.Season.join(", ")}</td>
            <td class="p-2 border">{fish.Location}</td>
            <td class="p-2 border">{fish.Weather}</td>
            <td class="p-2 border">{fish.Time}</td>
            <td class="p-2 border">{fish['Base Price']}</td>
            <td class="p-2 border">{fish['Base XP']}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
