import type { PageServerLoad } from './$types';

async function fetchUsers() {
  const response = await fetch('https://user-list-backend.netlify.app/api/users');
  const data = await response.json();
  return data;

}

export const load: PageServerLoad = async () => {
  try {
    const users = await fetchUsers();
    return { users };
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
