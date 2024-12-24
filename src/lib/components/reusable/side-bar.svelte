<script lang="ts">
	import LogoText from './logo-text.svelte';
	import LinkButtonHome from './link-button/link-button-home.svelte';
	import LinkButtonSearch from './link-button/link-button-search.svelte';
	import LinkButtonNotifications from './link-button/link-button-notifications.svelte';
	import LinkButtonSettings from './link-button/link-button-settings.svelte';
</script>

<aside class="fixed hidden h-screen w-sidebar flex-col items-center text-center md:flex">
	<LogoText class="absolute top-2" />
	<div class="flex__gap__md absolute top-1/2 flex -translate-y-1/2 flex-col">
		<LinkButtonHome />
		<LinkButtonSearch />
		<LinkButtonNotifications />
		<LinkButtonSettings />
	</div>
</aside>
