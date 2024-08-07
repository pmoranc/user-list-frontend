<script lang="ts">
	export let size: 'small' | 'outline' | 'large' | 'edit' | 'delete';
</script>

<button class={`${size}`} on:click>
	<slot />
</button>

<style lang="scss">
	button {
		cursor: pointer;
		font-weight: 700;
		text-transform: uppercase;
		line-height: 16px;
		letter-spacing: 0.4px;
		background-color: var(--color-primary);
		color: #fff;
		font-family: var(--font-body);
		font-size: 18px;
		border: 0;
		padding: 10px 18px;
		border: 2px solid var(--color-primary);
		&:hover {
			opacity: 0.8;
		}
	}

	.small {
		min-width: 138px;
	}

	.outline {
		min-width: 138px;
		border: 2px solid var(--color-primary);
		background-color: #fff;
		color: var(--color-primary);
	}

	.large {
		min-width: 226px;
	}

	.edit {
		margin-right: 22px;
	}

	.edit,
	.delete {
		background-color: var(--color-primary);
		color: #fff;
		padding: 10px 8px;
	}
</style>
