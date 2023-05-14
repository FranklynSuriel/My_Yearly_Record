import React from 'react';
import {
  Container,
  Card,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';


const SavedTvShows = () => {


  const { loading, data } = useQuery(QUERY_ME);
  
  console.log(data)

  // if data isn't here yet, say so
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div fluid className="text-light p-5">
        <Container>
          {/* <h1>Viewing saved tv shows!</h1> */}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5 savedtv-title'>
          {data.me.savedTvShows.length
            ? `Viewing ${data.me.savedTvShows.length} saved ${data.me.savedTvShows.length === 1 ? 'TvShow' : 'TvShows'}:`
            : 'You have no saved TvShows!'}
        </h2>
        <Row>
          {data.me.savedTvShows.map((tvShow) => {
            return (
              <Col md="4" style={{ maxHeight: "600px", paddingTop:"20px"}}>
                <Card key={tvShow.tvShowId} className='show-box' >
                  {tvShow.poster ? <Card.Img style={{objectFit: 'contain', maxHeight: "200px"}} src={tvShow.poster} alt={`The cover for ${tvShow.name}`} variant='top' /> : null}
                  <Card.Body >
                    <Card.Title>{tvShow.name}</Card.Title>
                    <p className='small'>Authors: {tvShow.authors}</p>
                    <Card.Text style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {tvShow.overview}
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

export default SavedTvShows;