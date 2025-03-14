<script lang="ts">
</script>

<div class="navbar bg-base-100 sticky top-0 z-50 flex-row justify-between gap-4 shadow-lg">
	<div class="">
		<a class="btn btn-ghost text-xl" href="/">Training budget manager</a>
	</div>
	<div class="grow flex-row gap-2">
		<div class="flex gap-2">
			<a class="btn btn-ghost" href="/requests">My requests</a>
		</div>
	</div>
	<div class="dropdown dropdown-end">
		<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
			<div class="w-10 rounded-full">
				<img alt="Avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
			</div>
		</div>
		<ul
			tabindex="0"
			class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
		>
			<li><a>Profile</a></li>
			<li><a>Settings</a></li>
			<li><a href="/sign-out">Sign out</a></li>
		</ul>
	</div>
</div>
