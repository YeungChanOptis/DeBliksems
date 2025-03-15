<script>
	import { Mail, Lock } from 'lucide-svelte';
</script>

<div class="flex min-h-[80vh] items-center justify-center p-4">
	<div class="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
		<div class="p-6 sm:p-8">
			<div class="mb-6 text-center">
				<h1 class="text-2xl font-bold text-gray-900">Sign in</h1>
				<p class="mt-1 text-sm text-gray-500">Enter your credentials to access your account</p>
			</div>

			<form action="/sign-in" method="POST" class="space-y-5">
				<div class="space-y-2">
					<label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
					<div class="relative">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
						>
							<Mail class="h-4 w-4" />
						</div>
						<input
							id="email"
							type="email"
							name="email"
							placeholder="name@example.com"
							class="w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 transition-colors focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
							required
						/>
					</div>
				</div>

				<div class="space-y-2">
					<div class="relative">
						<div
							class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
						>
							<Lock class="h-4 w-4" />
						</div>
						<input
							id="password"
							type={'password'}
							name="password"
							class="w-full rounded-md border border-gray-300 py-2 pr-10 pl-10 transition-colors focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
							required
						/>
					</div>
				</div>

				<button
					type="submit"
					class="btn btn-primary w-full rounded-md px-4 py-2 font-medium text-white transition-colors"
				>
					Sign in
				</button>
			</form>
		</div>
	</div>
</div>
