import { useEffect, useState } from 'react';
import { UsersListView } from './View';

function useUsersListState() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    setUsers([]);
  }, [setUsers]);

  return {
    users,
  };
}

export const UsersListContainer = () => {
  const { users } = useUsersListState();

  return <UsersListView users={users} />;
};
