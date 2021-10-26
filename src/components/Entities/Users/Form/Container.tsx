import { useEffect, useState } from 'react';
import { UsersFormView } from './View';

function useUsersFormState() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser({});
  }, [setUser]);

  return {
    user,
  };
}

export const UsersFormContainer = () => {
  const { user } = useUsersFormState();

  return <UsersFormView user={user} />;
};
