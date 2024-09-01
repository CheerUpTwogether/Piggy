import {useState} from 'react';
import {Friend} from '@/mock/Friends/type';

export const useFriendActions = (initialFriends: Friend[]) => {
  const [friendsList, setFriendsList] = useState<Friend[]>(initialFriends);

  const onFriendAdded = (friendId: string) => {
    setFriendsList(prevResults =>
      prevResults.map(user =>
        user.id === friendId ? {...user, is_friend: true} : user,
      ),
    );
  };

  const onFriendRemoved = (friendId: string) => {
    setFriendsList(prevResults =>
      prevResults.map(user =>
        user.id === friendId ? {...user, is_friend: false} : user,
      ),
    );
  };

  return {
    friendsList,
    onFriendAdded,
    onFriendRemoved,
    setFriendsList,
  };
};
