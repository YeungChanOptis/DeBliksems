<script lang="ts">
	import '../../app.css';
	import Navbar from '../../lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<div>
	<Navbar />
	<main class="container mx-auto px-4 pt-8 pb-4">
		{@render children()}
	</main>
</div>
