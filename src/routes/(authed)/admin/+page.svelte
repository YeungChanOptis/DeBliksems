<script lang="ts">
	import AdminRequestCard from '$lib/components/AdminRequestCard.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

{#if data.pendingRequests.length === 0}


<div class="min-h-screen flex items-center justify-center ">
  <div class="text-center p-8 rounded-lg   max-w-md mx-auto ">
    <div class="mb-4 text-5xl">🥳</div>
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">All Caught Up!</h2>
    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
      You have no pending requests from your team
    </p>
  </div>
</div>
{:else}
	<h1 class="mb-8 text-4xl font-bold">Requests waiting your approval</h1>
	<div class="flex w-full gap-4">
		<div class="flex flex-1 flex-col gap-4">
			{#each data.pendingRequests as request}
				<AdminRequestCard {...request} />
			{/each}
		</div>
	</div>
{/if}
