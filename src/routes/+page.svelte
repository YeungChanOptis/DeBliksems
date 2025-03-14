<script lang="ts">
	import ConferenceCard from '../lib/components/ConferenceCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex">
	<h1 class=" mb-8 grow text-center text-4xl font-bold">Upcoming Developer Conferences</h1>
	<a class="btn btn-success" href="training/new">Create new event</a>
</div>

<div class="flex flex-wrap justify-center gap-4">
	{#each data.trainings as conference}
		<ConferenceCard {...conference} />
	{/each}
</div>
