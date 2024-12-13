<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const chatCard = document.getElementById('chat_card')!;

		chatCard.scrollTop = chatCard.scrollHeight;
	});
</script>

<main>
	<div
		class="fixed left-1/2 top-0 flex h-[var(--chat-header-height)] w-full -translate-x-1/2 items-center gap-4 bg-card p-4 text-card-foreground sm:w-3/4 lg:w-1/2"
	>
		<a href="/">
			<Button class="w-fit">Back</Button>
		</a>
		<div class="flex items-center gap-2">
			<img class="size-10" src="/favicon.png" alt="favicon" />
			<h3 class="font-semibold">Anonymous[100]</h3>
		</div>
	</div>
	<div
		id="chat_card"
		class="fixed left-1/2 top-[var(--chat-header-height)] h-[calc(100vh-var(--chat-header-height))] w-full -translate-x-1/2 overflow-y-auto !rounded-none bg-card px-4 pb-16 pt-4 text-card-foreground sm:w-3/4 lg:w-1/2"
	>
		<div class="mt-3 flex flex-col gap-3">
			{#each new Array(36).fill(null) as _, i}
				<div class="flex" class:justify-end={i % 2 === 0} class:justify-start={i % 2 !== 0}>
					<div
						class="w-fit rounded-md p-2"
						class:bg-purple-100={i % 2 === 0}
						class:text-black={i % 2 === 0}
						class:bg-secondary={i % 2 !== 0}
						class:text-secondary-foreground={i % 2 !== 0}
					>
						<p>Hello world {i + 1}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="fixed bottom-0 left-1/2 w-full -translate-x-1/2 bg-background sm:w-3/4 lg:w-1/2">
		<Input type="text" placeholder="Type a message" class="rounded-none" />
	</div>
</main>
