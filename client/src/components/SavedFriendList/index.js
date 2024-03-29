import React from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USERS } from '../../utils/queries';

// Function allows you to remove a friend from you save list in the database and local storage.
const SavedFriends = () => {


  const  { loading, data } = useQuery(QUERY_ME, QUERY_USERS);

  // if data isn't here yet, say so
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div fluid className="text-light p-5">
        <Container>
          {/* <h1>Viewing saved Friends!</h1> */}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data.me.savedFriends.length
            ? `Viewing ${data.me.savedFriends.length} saved ${data.me.savedFriends.length === 1 ? 'Friend' : 'Friends'}:`
            : 'You have no saved Friends!'}
        </h2>
        <Row>
          {data.me.savedFriends.map((friend) => {
            return (
              <Col md="4" style={{ maxHeight: "600px", paddingTop: "20px" }}>
                <div className='friend-box'>
                <Card key={friend.friendId} className='friend-text' >
                  <Card.Body >
                    <Card.Title>{friend.username}</Card.Title>
                    <Button className='join-btn'>Remove Friend</Button>
                  </Card.Body>
                </Card>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedFriends;