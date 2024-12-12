<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { children, class: className, ...rest }: HTMLAttributes<HTMLElement> = $props();
</script>

<section
	class={cn(
		'absolute left-1/2 top-8 inline-block w-full -translate-x-1/2 rounded-none bg-card p-8 text-card-foreground shadow-md dark:shadow-none sm:w-3/4 sm:rounded-2xl lg:w-1/2',
		className
	)}
	{...rest}
>
	{@render children?.()}
</section>
