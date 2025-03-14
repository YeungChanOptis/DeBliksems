<script lang="ts">
	import RequestCard from '$lib/components/RequestCard.svelte';
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<h1 class="mb-8 text-4xl font-bold">My requests</h1>
<div class="flex w-full gap-4">
	<div class="flex flex-1 flex-col gap-4">
		{#each data.trainingRequests as request}
			<RequestCard {...request} />
		{/each}
	</div>
    <div class="flex-1 h-96 sticky top-20"><DonutChart availableBudget={data.availableBudget} usedBudget={data.usedBudget} /></div>
</div>
