<form method="POST" action="/sign-in">
	<h1 class="text-2xl font-semibold">Sign in</h1>
	<div class="flex flex-col gap-1">
		<label for="email">Email</label>
		<input id="email" type="email" name="email" class="input" />
	</div>
	<div class="flex flex-col gap-1">
		<label class="label" for="password">Password</label>
		<input id="password" type="password" name="password" class="input" />
	</div>
	<button class="btn">Sign in</button>
</form>
