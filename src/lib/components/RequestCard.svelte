<script lang="ts">
	import { enhance } from '$app/forms';
	import { CONSULTANT_DAY_PRICE } from '$lib/constants';
	import type { Cost } from '$lib/server/db/schema';
	import { Plus } from 'lucide-svelte';

	export let id: string;
	export let ticketCost: string | null;
	export let durationDays: string;
	export let trainingName: string | null;
	export let status: string | null;
	export let costs: Cost[];
	let costsTotal = costs.reduce((acc, cost) => acc + parseFloat(cost.amount), 0);
	let additionalCostsTotal = costsTotal ? parseFloat(costsTotal.toFixed(2)) : 0;

	$: {
		if (costs) {
			costsTotal = costs.reduce((acc, cost) => acc + parseFloat(cost.amount), 0);
			additionalCostsTotal = costsTotal ? parseFloat(costsTotal.toFixed(2)) : 0;
		}
	}

	const parsedTicketCost = ticketCost ? parseFloat(ticketCost) : 0;
	const resultingCost = CONSULTANT_DAY_PRICE * parseFloat(durationDays);
	const estimatedCost = parsedTicketCost + resultingCost + additionalCostsTotal;

	const STATUS_MAP: Record<string, { text: string; color: string }> = {
		PENDING: { text: 'Pending', color: 'badge-warning' },
		APPROVED: { text: 'Approved', color: 'badge-success' },
		DENIED: { text: 'Denied', color: 'badge-error' }
	};

	let myModal: HTMLDialogElement;
	let form: HTMLFormElement;

	function handleSubmit() {
		form.reset();
		myModal.close();
	}
</script>

<div class="card rounded-lg border border-gray-300 bg-white shadow-lg">
	<div class="card-body space-y-2">
		<div class="flex justify-between">
			<h2 class="text-3xl font-semibold text-gray-800">{trainingName ?? ''}</h2>
			{#if status}
				<span class={`badge badge-soft ${STATUS_MAP[status]?.color ?? ''}`}
					>{STATUS_MAP[status]?.text ?? 'Onbekend'}</span
				>
			{/if}
		</div>
		<p class="text-gray-600">
			<strong>Ticket Cost:</strong>
			<span class="text-gray-800">€{parsedTicketCost.toFixed(2)}</span>
		</p>
		<p class="text-gray-600">
			<strong>Consultant day price:</strong>
			<span class="text-gray-800">€{CONSULTANT_DAY_PRICE.toFixed(2)}</span>
		</p>
		<p class="text-gray-600">
			<strong>Days Attending:</strong>
			<span class="text-gray-800"
				>{`${durationDays} days (resulting cost = €${resultingCost.toFixed(2)})`}</span
			>
		</p>
		<p class="text-gray-600">
			<strong>Additional expenses:</strong>
			<span class="text-gray-800">€{additionalCostsTotal.toFixed(2)}</span>
		</p>
		<hr class="border-gray-300" />
		<div class="flex items-center justify-between text-lg text-gray-800">
			💰 Estimated Cost: €{estimatedCost.toFixed(2)}
			{#if status === 'APPROVED'}
				<button class="btn btn-primary" on:click={() => myModal.showModal()}>Add expenses</button>
			{/if}
			<dialog bind:this={myModal} class="modal">
				<div class="modal-box">
					<form
						id={`${id}-add-expense`}
						method="POST"
						class="space-y-6"
						use:enhance
						bind:this={form}
						on:submit={handleSubmit}
					>
						<input type="hidden" name="trainingRequestId" defaultValue={id} />
						<h3 class="text-xl font-bold">Add Expenses</h3>
						<p class="text-base">Enter your additional expense below:</p>
						<input
							name="name"
							type="text"
							placeholder="Name"
							class="input input-bordered mb-4 w-full"
						/>
						<select name="type" class="select select-bordered w-full">
							{#each ['Transport', 'Accomodation', 'Other'] as costType}
								<option value={costType}>{costType}</option>
							{/each}
						</select>
						<input
							name="amount"
							type="number"
							placeholder="Amount (in euro)"
							class="input input-bordered mb-4 w-full"
						/>
					</form>
					<div class="modal-action">
						<form method="dialog">
							<button class="btn">Close</button>
						</form>
						<button class="btn btn-primary" type="submit" form={`${id}-add-expense`}
							><Plus />Add expense</button
						>
					</div>
				</div>
			</dialog>
		</div>
	</div>
</div>
