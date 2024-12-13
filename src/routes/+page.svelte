<script>
	import ChatCard from '$lib/components/chat/chat-card.svelte';
	import PageContent from '$lib/components/reusable/page-content.svelte';
	import SideBar from '$lib/components/reusable/side-bar.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
</script>

<main>
	<SideBar />
	<PageContent>
		<div class="flex flex-col gap-2">
			<h3 class="page__content__title">Chats</h3>
			<Input type="text" placeholder="Search chats" />
		</div>
		<div class="mt-3 grid grid-cols-1 gap-3">
			{#each new Array(10).fill(null) as _}
				<ChatCard />
			{/each}
		</div>
	</PageContent>
</main>
