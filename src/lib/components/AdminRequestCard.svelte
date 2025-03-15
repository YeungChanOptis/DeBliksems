<script lang="ts">
	import { CONSULTANT_DAY_PRICE } from '$lib/constants';
	import { enhance } from '$app/forms';

	export let id: string;
	export let ticketCost: string | null;
	export let durationDays: string;
	export let trainingName: string | null;
	export let status: string | null;

	const parsedTicketCost = ticketCost ? parseFloat(ticketCost) : 0;
	const resultingCost = CONSULTANT_DAY_PRICE * parseFloat(durationDays);
	const estimatedCost = parsedTicketCost + resultingCost;

	const STATUS_MAP: Record<string, { text: string; color: string }> = {
		PENDING: { text: 'Pending', color: 'badge-warning' },
		APPROVED: { text: 'Approved', color: 'badge-success' },
		DENIED: { text: 'Denied', color: 'badge-error' }
	};
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

		<hr class="border-gray-300" />

		<div class="flex justify-between">
			<p class=" grow text-lg text-gray-800">
				💰 Estimated Cost: <span class="text-green-600">€{estimatedCost.toFixed(2)}</span>
			</p>
			<div class="flex gap-4">
				<form method="POST" id={`${id}-decline`} action="?/decline" use:enhance>
					<input type="hidden" name="id" id="id" value={id}>
					 <button type="submit"  class="btn btn-error text-white">Decline</button>
				</form>
				<form method="POST" id={`${id}-accept`} action="?/accept" use:enhance>
					<input type="hidden" name="id" id="id" value={id}>
					<button class="btn btn-success text-white">Approve</button>
				</form>
			</div>	
		</div>
	</div>
</div>
