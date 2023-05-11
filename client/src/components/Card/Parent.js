import React from 'react'
import styled from 'styled-components'
import { FaCommentAlt, FaThumbsUp} from 'react-icons/fa'
import Card from './Card'
const StyledRoot = styled.div`
  padding: 50px 12px;
`
const StyledContainer = styled.div`
  max-width: 550px;
  width: 100%;
  margin: auto;
`
const Parent = () => {
  const date = new Date().toLocaleDateString()
  const onCommentClick = () => alert('You clicked comments')
  const onLikesClick = () => alert('You clicked comments')
  const buttons = [
    {
      label: (
        <>
          <FaCommentAlt /> 0 Comments
        </>
      ),
      onClick: onCommentClick,
    },
    {
      label: (
        <>
          <FaThumbsUp /> 242 Likes
        </>
      ),
      onClick: onLikesClick,
    },
  ]
  return (
    <StyledRoot>
      <StyledContainer>
        <Card
          title="Succession"
          date={date}
          description="Dad doesn't like his kids"
          actions={buttons}
        />
      </StyledContainer>
    </StyledRoot>
  )
}
export default Parent;