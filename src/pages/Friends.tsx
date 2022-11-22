import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import { useGetFriends } from '../features/friends/api/useGetFriends';

const Friends = () => {
  const { data } = useGetFriends();
  const { user, isCheckingUser } = useAuth();

  if (isCheckingUser && !user) {
    return <>Loading</>;
  } else if (user) {
    return (
      <ul>
        {data?.map((frdshp) => {
          return <li key={frdshp.id}>{frdshp.friendTo?.handleName}</li>;
        })}
      </ul>
    );
  } else {
    return <Navigate to='/auth/login' />;
  }
};

export default Friends;
