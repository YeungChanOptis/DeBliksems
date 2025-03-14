<script lang="ts">
	import '../../app.css';
	let { children } = $props();
</script>

<div class="grid h-screen w-screen items-center justify-center">
	{@render children()}
</div>
