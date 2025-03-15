<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();

	let message = $derived(form?.form?.message);
	let errors = $derived(form?.form?.errors ?? {});

	$effect(() => {
		// Focus on first error
		if (Object.keys(errors).length) {
			document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
		}
	});
</script>

<div class="min-h-screen py-8">
	<div class="container mx-auto max-w-2xl px-4">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h1 class="card-title mb-6 justify-center text-center text-3xl font-bold">
					Add New Conference
				</h1>

				<form method="POST" use:enhance class="space-y-6">
					<div class="form-control">
						<label class="fieldset-label">
							Name
							{#if errors.name}
								<span class="label-text-alt text-error">{errors.name}</span>{/if}
						</label>
						<input
							class="input input-bordered w-full"
							placeholder="Enter conference name"
							name="name"
							aria-invalid={errors.name ? 'true' : undefined}
						/>
					</div>

					<div class="form-control">
						<label class="fieldset-label">
							Price
							{#if errors.price}
								<span class="label-text-alt text-error">{errors.price}</span>{/if}
						</label>
						<input
							class="input input-bordered w-full"
							placeholder="Ticket price"
							name="price"
							type="number"
							min="0.00"
							max="10000.00"
							step="0.01"
							aria-invalid={errors.price ? 'true' : undefined}
						/>
					</div>

					<div class="form-control">
						<label class="fieldset-label">
							Description
							{#if errors.description}
								<span class="label-text-alt text-error">{errors.description}</span>
							{/if}
						</label>
						<input
							class="textarea textarea-bordered h-32 w-full"
							placeholder="Enter conference description"
							name="description"
							aria-invalid={errors.description ? 'true' : undefined}
						/>
					</div>

					<div class="flex gap-6">
						<div class="form-control flex gap-6">
							<label class="fieldset-label">
								From
								{#if errors.startDate}
									<span class="label-text-alt text-error">{errors.startDate}</span>
								{/if}
							</label>
							<input
								class="input"
								type="date"
								placeholder="Enter conference start date"
								name="startDate"
								aria-invalid={errors.startDate ? 'true' : undefined}
							/>
						</div>

						<div class="form-control flex gap-6">
							<label class="fieldset-label">
								to
								{#if errors.endDate}
									<span class="label-text-alt text-error">{errors.endDate}</span>
								{/if}
							</label>
							<input
								class="input"
								type="date"
								placeholder="Enter conference end date"
								name="endDate"
								aria-invalid={errors.endDate ? 'true' : undefined}
							/>
						</div>
					</div>

					<button class="btn btn-success">Submit</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
</style>
