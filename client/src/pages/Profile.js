import React, { useState } from 'react';
import {
  Button
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import SavedBookList from '../components/SavedBookList'
import SavedTvShowList from '../components/SavedTvShowList'
import SavedFriendList from '../components/SavedFriendList'

const SavedFriends = () => {
  const [BookList, setBookList] = useState(false);
  const [TvShowList, setTvShowList] = useState(false);
  const [FriendList, setFriendList] = useState(false);
  const { loading, data } = useQuery(QUERY_ME);

  const handleBook = () => {
    setBookList(true);
    setTvShowList(false);
    setFriendList(false);
  }
  const handleTvShow = () => {
    setBookList(false);
    setTvShowList(true);
    setFriendList(false);
  }
  const handleFriend = () => {
    setBookList(false);
    setTvShowList(false);
    setFriendList(true);
  }

  console.log(data)

  // if data isn't here yet, say so
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <div>
          <h2>Check out your lists</h2>
        </div>
        <Button onClick={handleBook}>Book List</Button>
        <Button onClick={handleTvShow}>Tv Show List</Button>
        <Button onClick={handleFriend}>Friend List</Button>
        {BookList && <SavedBookList />}
        {TvShowList && <SavedTvShowList />}
        {FriendList && <SavedFriendList />}
      </div>
    </>
  );
};

export default SavedFriends;