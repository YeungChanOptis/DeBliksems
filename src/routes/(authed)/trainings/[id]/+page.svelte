<script lang="ts">
	import { daysBetween } from '$lib/utils/dateUtils';
	import { Calendar, Euro } from 'lucide-svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();

	const image =
		'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
	let showFullDescription = $state(false);

	const formatDate = (date: string) => {
		return new Date(date).toLocaleDateString();
	};

	let dialog: HTMLDialogElement;

	const { startDate, endDate } = data.training;
	const dayDiff = daysBetween(startDate, endDate);
</script>

<div class="container mx-auto max-w-4xl px-4 py-8">
	<div class="card bg-base-100 overflow-hidden shadow-xl">
		<figure class="relative h-64 w-full">
			<img
				src={image || '/placeholder.svg'}
				alt={data.training.name}
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
		</figure>

		<div class="card-body">
			<div class="flex w-full items-center justify-between">
				<h1 class="card-title text-3xl font-bold">{data.training.name}</h1>
				<div class="w-fit">
					<strong>Available budget:</strong>
					<span class="text-lg text-green-500">€{data.availableBudget}</span>
				</div>
			</div>

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
					<div class="stat-value text-lg">€{parseFloat(data.training.price).toFixed(2)}</div>
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
				<button
					onclick={() => dialog.showModal()}
					class="btn btn-primary"
					disabled={data.attending}
				>
					{#if data.attending}
						Already attending training
					{:else}
						Request Attendance
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>

<dialog bind:this={dialog} class="modal">
	<div class="modal-box grid gap-2">
		<span class="text-lg font-bold">Confirm attendance for "{data.training.name}"</span>
		<form class="grid gap-2" action={'/trainings/' + data.training.id} method="post">
			<div class="flex flex-col gap-1">
				<label for="durationDays">How many days are you attending?</label>
				<input
					id="durationDays"
					required
					type="number"
					class="input validator"
					name="durationDays"
					min="1"
					max={dayDiff}
				/>
				<p class="validator-hint">Must be between 1 and {dayDiff}</p>
			</div>
			<div class="flex flex-col gap-1">
				<label for="description">Comments</label>
				<textarea id="description" class="textarea" name="description"></textarea>
			</div>
			<button class="btn btn-primary my-2">Confirm attendence</button>
		</form>
		<button
			class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
			onclick={() => dialog.close()}>✕</button
		>
	</div>
</dialog>
