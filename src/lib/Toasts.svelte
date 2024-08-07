<script lang="ts">
	export let showToast: boolean;
	export let toastType: 'add' | 'edit' | 'delete';
</script>

{#if showToast}
	<div class="toast">
		<div class="toast--content {toastType}">
			<slot />
		</div>
	</div>
{/if}

<style lang="scss">
	.toast {
		max-width: 972px;
		color: #fff;
		margin: 20px auto 0 auto;
		&--content {
			padding: 20px;
		}
	}

	.add {
		background-color: var(--color-primary);
		&::before {
			content: '➕ ';
			color: #fff;
		}
	}

	.edit {
		background-color: #ffc300;
		&::before {
			content: '✏️ ';
			color: #fff;
		}
	}

	.delete {
		background-color: #081430;
		&::before {
			content: '🗑️ ';
			color: #fff;
		}
	}
</style>
