<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import SearchIcon from '$lib/icons/outline/search-icon.svelte';
</script>

<a href="/search">
	<Button variant={$page.url.pathname === '/search' ? 'secondary' : 'ghost'} class="link__button">
		<SearchIcon />
	</Button>
</a>
