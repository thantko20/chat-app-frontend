import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';
import { useGetFriends } from '../features/friends/api/useGetFriends';
import Friends from '../features/friends/Friends';

const FriendsPage = () => {
  return <Friends />;
};

export default FriendsPage;
