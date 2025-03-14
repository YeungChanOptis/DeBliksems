<script lang="ts">
	export let id: string;
	export let name: string;
	export let description: string | null;
	export let startDate: string;
	export let endDate: string;
	export let image: string;
</script>

<a class="card bg-base-100 m-4 w-96 shadow-xl hover:cursor-pointer" href="/trainings/{id}">
	<figure>
		<img src={image} alt={name} class="h-48 w-full object-cover" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{name}</h2>
		<p class="line-clamp-2">{description}</p>
		<div class="mt-2 flex items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
			<span>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span>
		</div>
		<div class="card-actions mt-4 justify-end">
			<button
				class="btn btn-primary"
				on:click={(event) => {
					event.preventDefault();
					alert(`Requesting attendance for ${name}`);
				}}
			>
				Request Attendance
			</button>
		</div>
	</div>
</a>
