<script lang="ts">
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<div>
	<Navbar />
	<main class="container mx-auto p-4">
		{@render children()}
	</main>
</div>
