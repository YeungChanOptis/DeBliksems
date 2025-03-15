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
    <div class="flex-1 h-96 sticky top-20 flex flex-col items-center">
		<h3 class="text-center text-3xl font-bold mb-4 {data.availableBudget < 0 ? 'negative' : ''}">
			Remaining budget: {data.availableBudget < 0 ? `-€${Math.abs(data.availableBudget)}` : `€${data.availableBudget}`}
		</h3>
		<DonutChart totalsPerType={data.totalsPerType} class="text-centerD"/>
	</div>
</div>

<style>
	.negative {
		color: #650909;
	}
</style>
