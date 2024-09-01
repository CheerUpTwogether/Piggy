import React from 'react';
import ProfileDetail from '@/pages/friends/ProfileDetail';
import {Friend, User} from '@/mock/Friends/type';

export interface ProfileDetailComponentProps {
  selectedUser: Friend | User;
  closeModal: () => void;
  onFriendAdded: (friendId: string) => void;
  onFriendRemoved: (friendId: string) => void;
}

const ProfileDetailComponent = ({
  selectedUser,
  closeModal,
  onFriendAdded,
  onFriendRemoved,
}: ProfileDetailComponentProps) => (
  <ProfileDetail
    id={selectedUser.id}
    nickname={selectedUser.nickname}
    total_appointment={selectedUser.total_appointment ?? 0}
    completed_appointment={selectedUser.completed_appointment ?? 0}
    profile_img_url={selectedUser.profile_img_url}
    is_friend={selectedUser.is_friend ?? false}
    closeModal={closeModal}
    onFriendAdded={onFriendAdded}
    onFriendRemoved={onFriendRemoved}
  />
);

export default ProfileDetailComponent;
