import * as R from 'ramda';
import { Box, Flex, GlobalStyle } from './ui'
import React, { useState, useEffect } from 'react';
///////////////////////////////////////////////////////////////////////////////////////////////////

// Helpers
export const getVideoTitle = (item) => `${R.add(item.position, 1)}. ${item.title}`;
export const getVideoIdByPath = R.path(['resourceId', 'videoId'])
// Helpers

export const VideoContent = ({ item }) => (
  <Flex alignItems='center' flexDirection='column' justifyContent='center'>
    <Box p='0 20px' mb='20px' fontSize='24px'>{getVideoTitle(item)}</Box>
    <Box height='50vw' maxWidth='640px' maxHeight='360px' width='calc(100vw - 40px)'>
      <iframe
        width='100%'
        height='100%'
        frameBorder='0'
        type='text/html'
        title={item.title}
        src={`http://www.youtube.com/embed/${getVideoIdByPath(item)}?autoplay=0`} />
    </Box>
  </Flex>
);

export const ListItem = (props) => (
  <Box m='0 5px' cursor='pointer' onClick={() => props.setActiveVideo(getVideoIdByPath(props.item))}>
    <img alt={props.item.title} title={getVideoTitle(props.item)} src={R.path(['thumbnails', 'default', 'url'], props.item)} />
  </Box>
);

const playlistId = 'PLPxbbTqCLbGE5AihOSExAa4wUM-P42EIJ';
const apiKey = 'AIzaSyDBOi4s_dNXJ8KHR_7z-8QNL27e0iDtWW8';

const App = () => {
  const [ items, setItems ] = useState({})
  const [ activeVideo, setActiveVideo ] = useState(null)
  useEffect(() => {
    if (R.not(R.isEmpty(items))) return;
    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&part=snippet&playlistId=${playlistId}`,
      { method: 'GET' },
    )
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const items = R.map(R.prop('snippet'), data.items);
      const activeVideo = getVideoIdByPath(R.head(items))
      const indexedItems = R.indexBy(getVideoIdByPath, items);
      setItems(indexedItems);
      setActiveVideo(activeVideo);
    })
  })
  return (
    <div className='App'>
      <GlobalStyle />
      <Flex flexDirection='column' alignItems='center' justifyContent='center' width='100vw' height='100vh'>
          {R.not(R.isNil(activeVideo)) && <VideoContent item={items[activeVideo]} />}
          <Box p='5px 5px 0' mt='20px' border='1px solid lightgray' borderRadius='5px'>
            <Flex maxWidth='650px' width='calc(100vw - 40px)' overflow='auto' height='max-content'>
              {R.map((item) => (
                <ListItem item={item} setActiveVideo={setActiveVideo} key={getVideoIdByPath(item)} />
              ), R.values(items))}
            </Flex>
          </Box>
      </Flex>
    </div>
  );
}

export default App;
