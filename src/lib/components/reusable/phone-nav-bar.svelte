<script lang="ts">
	import LinkButtonHome from './link-button/link-button-home.svelte';
	import LinkButtonNotifications from './link-button/link-button-notifications.svelte';
	import LinkButtonSearch from './link-button/link-button-search.svelte';
	import LinkButtonSettings from './link-button/link-button-settings.svelte';
	import LogoText from './logo-text.svelte';
</script>

<div
	class="fixed bottom-0 left-1/2 z-10 flex h-[var(--phone-navbar-height)] w-full -translate-x-1/2 items-center justify-between bg-card p-4 text-card-foreground sm:w-[90%] sm:rounded md:hidden"
>
	<LogoText />
	<div class="flex__gap__md flex">
		<LinkButtonHome />
		<LinkButtonSearch />
		<LinkButtonNotifications />
		<LinkButtonSettings />
	</div>
</div>
