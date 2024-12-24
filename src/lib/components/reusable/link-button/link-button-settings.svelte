<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import SettingsIcon from '$lib/icons/outline/settings-icon.svelte';
</script>

<a href="/settings">
	<Button variant={$page.url.pathname === '/settings' ? 'secondary' : 'ghost'} class="link__button">
		<SettingsIcon />
	</Button>
</a>
