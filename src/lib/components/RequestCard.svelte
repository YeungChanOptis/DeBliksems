<script lang="ts">
	import { CONSULTANT_DAY_PRICE } from '$lib/constants';

	export let ticketCost: string | null;
	export let durationDays: string;
	export let trainingName: string | null;
	const parsedTicketCost = ticketCost ? parseFloat(ticketCost) : 0;
	const resultingCost = CONSULTANT_DAY_PRICE * parseFloat(durationDays);
	const estimatedCost = parsedTicketCost + resultingCost;
</script>

<div class="card rounded-lg border border-gray-300 bg-white shadow-lg">
	<div class="card-body space-y-2">
		<h2 class="text-3xl font-semibold text-gray-800">{trainingName ?? ""}</h2>

		<p class="text-gray-600">
			<strong>Ticket Cost:</strong> <span class="text-gray-800">€{parsedTicketCost.toFixed(2)}</span>
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

		<p class="text-lg text-gray-800">
			💰 Estimated Cost: <span class="text-green-600">€{estimatedCost.toFixed(2)}</span>
		</p>
	</div>
</div>
