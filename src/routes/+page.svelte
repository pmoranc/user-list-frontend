<script lang="ts">
	export let data: {
		users: Array<{
			id: number;
			avatar: string;
			email: string;
			first_name: string;
			last_name: string;
		}>;
	};
	import Button from '$lib/Button.svelte';
	import Modal from '$lib/Modal.svelte';
	import Toasts from '$lib/Toasts.svelte';

	let showModal = false;
	let modalHeader = '';
	let toastType: 'add' | 'edit' | 'delete' = 'add';
	let showToast = false;
	let toastMessage = '';

	let userForm = {
		first_name: '',
		last_name: '',
		email: '',
		avatar: ''
	};

	let currentUserId: number | null = null;

	function handleAddUser() {
		showModal = true;
		modalHeader = 'Create New User';

		userForm = {
			first_name: '',
			last_name: '',
			email: '',
			avatar: ''
		};

		currentUserId = null;
	}

	function handleEdit(userId: number) {
		showModal = true;
		currentUserId = userId;

		const user = data.users.find((u) => u.id === userId);
		if (user) {
			userForm = { ...user };
		}

		modalHeader = 'Edit User';
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		console.log(currentUserId);
		const { first_name, last_name, email, avatar } = userForm;
		let response = null;

		if (!currentUserId) {
			response = await fetch('https://user-list-backend.netlify.app/api/create-user', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					first_name,
					last_name,
					email,
					avatar
				})
			});

			toastMessage = 'User added successfully!';
			toastType = 'add';
		} else {
			response = await fetch('https://user-list-backend.netlify.app/api/update-user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: currentUserId,
					first_name,
					last_name,
					email,
					avatar
				})
			});

			toastMessage = 'User updated successfully!';
			toastType = 'edit';
		}

		const result = await response.json();

		if (response.ok) {
			console.log('Submit action:', result);
			updateUsers(result.data);
			showModal = false;
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 8888);
		} else {
			console.error('Failed to update data:', result);
		}
	}

	function updateUsers(users: any) {
		data.users = users;
	}

	async function handleDelete(userId: number) {
		const response = await fetch(
			'https://user-list-backend.netlify.app/api/delete-user/' + userId,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: userId
				})
			}
		);

		const result = await response.json();

		if (response.ok) {
			console.log('Delete action:', await result);
			toastMessage = 'User deleted successfully!';
			toastType = 'delete';
			showToast = true;
			setTimeout(() => {
				showToast = false;
			}, 8888);
			updateUsers(result.data);
		} else {
			console.error('Failed to delete data:', response);
		}
	}

	function handleCancel() {
		showModal = false;
		console.log('Edit cancelled');
	}
</script>

<div class="create-user">
	<Button size="large" on:click={() => handleAddUser()}>Create New User</Button>
</div>

<div class="users-container">
	<div class="users-header">
		<h2>User List</h2>
	</div>
	<table class="users-table">
		<thead>
			<tr>
				<th><h3>Avatar</h3></th>
				<th><h3>First Name</h3></th>
				<th><h3>Last Name</h3></th>
				<th class="email"><h3>Email Address</h3></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user}
				<tr>
					<td class="avatar"
						><img src={user.avatar} alt={user.first_name + ' ' + user.last_name} /></td
					>
					<td>{user.first_name}</td>
					<td>{user.last_name}</td>
					<td>{user.email}</td>
					<td class="actions">
						<Button size="edit" on:click={() => handleEdit(user.id)}>Edit</Button>
						<Button size="delete" on:click={() => handleDelete(user.id)}>Delete</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<Toasts {showToast} {toastType}>{toastMessage}</Toasts>

<Modal bind:showModal onSubmit={handleSubmit} onCancel={handleCancel}>
	<span slot="header">{modalHeader}</span>
	<form>
		<div class="form-group">
			<label for="first_name">First Name</label>
			<input
				bind:value={userForm.first_name}
				type="text"
				id="first_name"
				name="first_name"
				required
			/>
		</div>
		<div class="form-group">
			<label for="last_name">Last Name</label>
			<input bind:value={userForm.last_name} type="text" id="last_name" name="last_name" required />
		</div>
		<div class="form-group">
			<label for="email">Email Address</label>
			<input bind:value={userForm.email} type="email" id="email" name="email" required />
		</div>
		<div class="form-group">
			<label for="avatar">Avatar Image Link</label>
			<input bind:value={userForm.avatar} type="text" id="avatar" name="avatar" required />
		</div>
	</form>
	<div slot="footer">
		<Button size="outline" on:click={handleCancel}>Cancel</Button>
		<Button size="small" on:click={handleSubmit}>Save</Button>
	</div>
</Modal>

<style lang="scss">
	.create-user {
		text-align: right;
		max-width: 972px;
		margin: 0 auto 24px auto;
	}
	.users-container {
		max-width: 972px;
		margin: 0 auto;
		border: 1px solid var(--color-primary);

		.users-header {
			background-color: var(--color-primary);
			padding: 9px 0 10px 16px;
			h2 {
				color: #fff;
				margin: 0;
			}
		}

		table.users-table {
			width: 100%;
			border-collapse: collapse;
			.avatar img {
				width: 40px;
				height: 40px;
			}
			thead {
				tr {
					border-bottom: 1px solid var(--color-gray);

					th {
						// &:first-child {
						// padding-left: 16px;
						// }
						padding-left: 16px;
						padding-right: 16px;
						padding-top: 19px;
						text-align: left;
						padding-bottom: 17px;
						&.email {
							width: 33%;
						}
					}
					h3 {
						margin: 0;
					}
				}
			}
			tbody {
				tr {
					border-bottom: 1px solid var(--color-gray);
					height: 56px;
					&:last-child {
						border-bottom: 0;
					}
					td {
						padding-left: 16px;
						padding-right: 16px;
						&:first-child {
							padding-left: 32px;
						}
						&.actions {
							text-align: right;
						}
					}
				}
			}
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 24px;
		.form-group {
			display: flex;
			flex-direction: column;
			gap: 6px;
			label {
				font-weight: 600;
				text-transform: uppercase;
			}
			input {
				border: 1px solid var(--color-gray);
				padding: 5px;
				height: 24px;
				font-family: var(--font-body);
			}
		}
	}
</style>
