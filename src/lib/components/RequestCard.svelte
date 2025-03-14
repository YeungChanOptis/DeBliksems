<script lang="ts">
	import { CONSULTANT_DAY_PRICE } from '$lib/constants';

	export let ticketCost: number;
	export let durationInDays: number;
	const resultingCost = CONSULTANT_DAY_PRICE * durationInDays;
	const estimatedCost = ticketCost + resultingCost;
</script>

<div class="card rounded-lg border border-gray-300 bg-white shadow-lg">
	<div class="card-body space-y-2">
		<h2 class="text-3xl font-semibold text-gray-800">Devoxx 2025</h2>

		<p class="text-gray-600">
			<strong>Ticket Cost:</strong> <span class="text-gray-800">{ticketCost.toFixed(2)}€</span>
		</p>

		<p class="text-gray-600">
			<strong>Days Attending:</strong> <span class="text-gray-800">{durationInDays} days</span>
		</p>

		<p class="text-gray-600">
			<strong>Resulting Cost:</strong> <span class="text-gray-800">{resultingCost}€</span>
		</p>

		<hr class="border-gray-300" />

		<p class="text-lg text-gray-800">
			💰 Estimated Cost: <span class="text-green-600">{estimatedCost}€</span>
		</p>
	</div>
</div>
