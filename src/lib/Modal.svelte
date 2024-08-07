<script lang="ts">
	export let showModal: boolean; // boolean
	export let onSubmit: (event: Event) => void;
	export let onCancel: () => void;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
	$: if (dialog && !showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<div class="modal-header">
			<h2>
				<slot name="header" />
			</h2>
		</div>
		<div class="modal-body">
			<slot />
		</div>
		<div class="modal-footer">
			<slot name="footer" />
		</div>
	</div>
</dialog>

<style lang="scss">
	dialog {
		width: 37em;
		border-radius: 0.2em;
		border: none;
		padding: 0;

		.modal-header {
			background-color: var(--color-primary);
			padding: 24px;
			h2 {
				color: #fff;
				margin: 0;
			}
		}

		.modal-body {
			padding: 24px 24px 0 24px;
		}

		.modal-footer {
			padding: 82px 24px 24px 24px;
			gap: 24px;
			display: flex;
			justify-content: flex-end;
		}

		h3 {
			margin: 0;
		}
	}
	dialog::backdrop {
		background: rgba(8, 20, 48, 0.6);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
