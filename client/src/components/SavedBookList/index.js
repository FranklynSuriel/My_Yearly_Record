import React from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { useMutation } from '@apollo/client';
import { REMOVE_BOOK } from '../../utils/mutations'
import Auth from '../../utils/auth'

const SavedBookList = () => {

  const [removeBook] = useMutation(REMOVE_BOOK);
  const { loading, data } = useQuery(QUERY_ME);


  
  const handleDeleteBook = async (bookId) => {    
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

    }catch(err) {
      console.log(err)
    }
  }
  // if data isn't here yet, say so
  if (loading) return <p>Loading...</p>;
  
  console.log(data)
  return (
    <>
      <div fluid className="text-light p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data.me.savedBooks.length
            ? `Viewing ${data.me.savedBooks.length} saved ${data.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {data.me.savedBooks.map((book) => {
            return (
              <Col md="4" style={{ maxHeight: "600px", paddingTop:"20px"}}>
                <Card key={book.bookId} border='dark' >
                  {book.image ? <Card.Img style={{objectFit: 'contain', maxHeight: "200px"}} src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body >
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {book.description}
                    </Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBookList;