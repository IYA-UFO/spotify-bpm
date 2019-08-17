import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Card, Image, Heading, Text } from 'rebass';

export default () => {
  const [query, setQuery] = useState('');
  const [artists, setAirtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    console.log('submit');
    fetch(`/api/spotify/artists?q=${query}`)
      .then(res => res.json())
      .then(json => {
        setAirtists(json);
      })
      .catch(err => {
        console.log(err);
      });
    e.preventDefault();
  };

  const handleAirtistClick = id => {
    fetch(`/api/spotify/tracks?artistId=${id}`)
      .then(res => res.json())
      .then(json => {
        const tracks = json;
        console.log(tracks);
      })
      .catch(err => {});
  };

  return (
    <Wrapper>
      <Title>アーティストを入力!</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" value={query} onChange={handleChange} />
        <Submit type="submit" value="Submit" />
      </Form>
      <AirtistsWrap>
        {artists.map(artist => (
          <div
            onClick={() => {
              handleAirtistClick(artist.id);
            }}
          >
            <p>{artist.name}</p>
          </div>
        ))}
      </AirtistsWrap>
      <TracksWrap></TracksWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #c5dbd9;
  margin: 100px auto;
  max-width: 375px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
`;

const Input = styled.input`
  display: block;
  font-size: 20px;
  width: 100%;
`;

const Submit = styled.input`
  display: block;
  line-height: 30px;
  margin-top: 10px;
  width: 30%;
`;

const AirtistsWrap = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;

const TracksWrap = styled.div`
  background-color: skyblue;
  max-height: 200px;
  overflow-y: scroll;
`;

const Code = styled.pre`
  max-width: 100%;
`;
