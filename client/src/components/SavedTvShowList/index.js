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
import { REMOVE_SHOW } from '../../utils/mutations';
import { removeWatchedShowIds } from '../../utils/localStorage';

// Function allows you to remove a tv show from you save list in the database and local storage.
const SavedTvShows = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeTvShows, {error}] = useMutation(REMOVE_SHOW, {
    update(cache, {data: {removeTvShows}}) {
    try {
      cache.writeQuery({
        query: QUERY_ME,
        data: {me: removeTvShows},
      }) 
    }catch(e) {
        console.error(e)
      }
    },
  });

    const handleDeleteShow = async (tvShowsId) => {
    console.log(tvShowsId)
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }
    console.log(removeTvShows)
    
    try {
      const { data } = await removeTvShows({
        variables: {
            tvShowsId: tvShowsId
      }
      });

      removeWatchedShowIds(tvShowsId)

    } catch (err) {
      console.log(err)
    }
    console.log(data)
  }

  // if data isn't here yet, say so
  if (loading) return <p>Loading...</p>;

  console.log(data)

  return (
    <>
      <div fluid className="text-light p-5">
        <Container>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5 savedtv-title'>
          {data.me.savedTvShows.length
            ? `Viewing ${data.me.savedTvShows.length} saved ${data.me.savedTvShows.length === 1 ? 'TV Show' : 'TV Shows'}:`
            : 'You have no saved TV Shows!'}
        </h2>
        <Row>
          {data.me.savedTvShows.map((tvShow) => {
            return (
              <Col md="4" style={{ maxHeight: "600px", paddingTop:"20px"}}>
                <Card key={tvShow.tvShowId} className='show-box h-100' >
                  {tvShow.poster ? <Card.Img style={{objectFit: 'contain', maxHeight: "200px"}} src={tvShow.poster} alt={`The cover for ${tvShow.name}`} variant='top' /> : null}
                  <Card.Body >
                    <Card.Title>{tvShow.name}</Card.Title>
                    <Card.Text style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {tvShow.overview}
                    </Card.Text> 
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteShow(tvShow.tvShowsId)}>
                      Delete this Show!
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

export default SavedTvShows;