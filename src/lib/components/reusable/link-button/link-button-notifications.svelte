<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import BellOutlineIcon from '$lib/icons/outline/bell-icon.svelte';
	import BellSolidIcon from '$lib/icons/solid/bell-icon.svelte';
</script>

<a href="/notifications">
	<Button
		variant={$page.url.pathname === '/notifications' ? 'secondary' : 'ghost'}
		class="link__button"
	>
		{#if $page.url.pathname === '/notifications'}
			<BellSolidIcon />
		{:else}
			<BellOutlineIcon />
		{/if}
	</Button>
</a>
