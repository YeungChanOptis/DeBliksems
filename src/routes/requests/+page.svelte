<script lang="ts">
	import RequestCard from '$lib/components/RequestCard.svelte';
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import type { PageProps } from './$types';

	const requests = [
		{
			id: 1,
			description: `Consectetur nostrud ut dolore aute consequat excepteur magna tempor adipisicing laborum sint occaecat minim reprehenderit elit. Culpa reprehenderit tempor do culpa ipsum magna consectetur reprehenderit pariatur adipisicing est amet.`,
			ticketCost: 25.0,
			durationInDays: 5
		},
		{
			id: 2,
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			ticketCost: 50.0,
			durationInDays: 3
		},
		{
			id: 3,
			description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
			ticketCost: 75.0,
			durationInDays: 7
		},
		{
			id: 4,
			description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
			ticketCost: 100.0,
			durationInDays: 10
		}
	];
    let { data }: PageProps = $props();
</script>

<h1 class="mb-8 text-4xl font-bold">My requests</h1>
<div class="flex w-full gap-4">
	<div class="flex flex-1 flex-col gap-4">
		{#each requests as request}
			<RequestCard {...request} />
		{/each}
	</div>
    <div class="flex-1 h-96 sticky top-4"><DonutChart /></div>
</div>
