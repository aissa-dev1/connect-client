<script lang="ts">
	import { page } from '$app/stores';
	import BellOutlineIcon from '$lib/icons/outline/bell-icon.svelte';
	import BellSolidIcon from '$lib/icons/solid/bell-icon.svelte';
	import HomeOutlineIcon from '$lib/icons/outline/home-icon.svelte';
	import SearchIcon from '$lib/icons/outline/search-icon.svelte';
	import SettingsIcon from '$lib/icons/outline/settings-icon.svelte';
	import HomeSolidIcon from '$lib/icons/solid/home-icon.svelte';
	import Button from '../ui/button/button.svelte';
	import LogoText from './logo-text.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { onMount } from 'svelte';
	import { toggleMode } from 'mode-watcher';

	let settingsIcon: HTMLElement;

	function applySettingsBtnRotate() {
		if (settingsIcon.classList.contains('rotate__90')) {
			settingsIcon.classList.remove('rotate__90');
			return;
		}

		settingsIcon.classList.add('rotate__90');
		setTimeout(() => {
			settingsIcon.classList.remove('rotate__90');
		}, 300);
	}

	onMount(() => {
		settingsIcon = document.querySelector('#settings_icon')!;
	});
</script>

<aside class="fixed flex h-screen w-sidebar flex-col items-center text-center">
	<LogoText class="absolute top-2" />
	<div class="flex__gap__md absolute top-1/2 flex -translate-y-1/2 flex-col">
		<a href="/">
			<Button variant={$page.url.pathname === '/' ? 'secondary' : 'ghost'} class="link__button">
				{#if $page.url.pathname === '/'}
					<HomeSolidIcon />
				{:else}
					<HomeOutlineIcon />
				{/if}
			</Button>
		</a>
		<a href="/search">
			<Button
				variant={$page.url.pathname === '/search' ? 'secondary' : 'ghost'}
				class="link__button"
			>
				<SearchIcon />
			</Button>
		</a>
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
	</div>
	<div class="absolute bottom-2 cursor-pointer">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button class="button__as__element" builders={[builder]} onclick={applySettingsBtnRotate}>
					<SettingsIcon id="settings_icon" class="size-7 duration-300" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56">
				<DropdownMenu.Label>Settings</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<div class="flex flex-col gap-4">
					<p>Toggle theme</p>
					<Button onclick={toggleMode}>Toggle</Button>
				</div>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</aside>
