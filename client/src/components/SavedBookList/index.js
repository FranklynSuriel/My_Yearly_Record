import React from 'react';
import {
  Container,
  Card,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';


const SavedBookList = () => {


  const { loading, data } = useQuery(QUERY_ME);
  
  
  // if data isn't here yet, say so
  if (loading) return <p>Loading...</p>;
  
  console.log(data)
  return (
    <>
      <div fluid className="text-light p-5">
        <Container>
          <h2></h2>
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
                <Card key={book.bookId} className='book-box h-100'>
                  {book.image ? <Card.Img style={{objectFit: 'contain', maxHeight: "200px"}} src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body >
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text style={{ maxHeight: "200px", overflowY: "scroll" }}>
                      {book.description}
                    </Card.Text>                    
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