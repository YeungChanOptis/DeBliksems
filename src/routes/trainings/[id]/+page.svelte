<script lang="ts">
	import { Calendar, Euro } from 'lucide-svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	const image =
		'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
	let showFullDescription = $state(false);

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString();
	};

	const calculateDuration = () => {
		const start = new Date(data.training.startDate);
		const end = new Date(data.training.endDate);
		const months =
			(end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
		return months;
	};
</script>

<div class="container mx-auto max-w-4xl px-4 py-8">
	<div class="card bg-base-100 overflow-hidden shadow-xl">
		<!-- Hero image -->
		<figure class="relative h-64 w-full">
			<img
				src={image || '/placeholder.svg'}
				alt={data.training.name}
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		</figure>

		<div class="card-body">
			<h1 class="card-title text-3xl font-bold">{data.training.name}</h1>

			<div class="my-6 grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="stat bg-base-200 rounded-box p-4">
					<div class="stat-figure text-primary">
						<Calendar class="h-6 w-6" />
					</div>
					<div class="stat-title">Start Date</div>
					<div class="stat-value text-lg">{formatDate(data.training.startDate)}</div>
				</div>

				<div class="stat bg-base-200 rounded-box p-4">
					<div class="stat-figure text-primary">
						<Calendar class="h-6 w-6" />
					</div>
					<div class="stat-title">End Date</div>
					<div class="stat-value text-lg">{formatDate(data.training.endDate)}</div>
				</div>

				<div class="stat bg-base-200 rounded-box p-4">
					<div class="stat-figure text-primary">
						<Euro class="h-6 w-6" />
					</div>
					<div class="stat-title">Price</div>
					<div class="stat-value text-lg">€{data.training.price}</div>
				</div>
			</div>

			<div class="divider text-lg">Description</div>
			<div class="prose max-w-none">
				<p class="text-base-content/80" class:line-clamp-2={!showFullDescription}>
					{data.training.description}
				</p>
				<button
					class="btn btn-link text-primary mt-2 p-0 no-underline"
					onclick={() => (showFullDescription = !showFullDescription)}
				>
					{#if showFullDescription}Read Less{:else}Read More{/if}
				</button>
			</div>

			<div class="card-actions mt-6 justify-end">
				<button class="btn btn-primary">Request Attendance</button>
			</div>
		</div>
	</div>
</div>
