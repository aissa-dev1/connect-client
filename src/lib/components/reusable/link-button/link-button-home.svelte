<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import HomeOutlineIcon from '$lib/icons/outline/home-icon.svelte';
	import HomeSolidIcon from '$lib/icons/solid/home-icon.svelte';
</script>

<a href="/">
	<Button variant={$page.url.pathname === '/' ? 'secondary' : 'ghost'} class="link__button">
		{#if $page.url.pathname === '/'}
			<HomeSolidIcon />
		{:else}
			<HomeOutlineIcon />
		{/if}
	</Button>
</a>
