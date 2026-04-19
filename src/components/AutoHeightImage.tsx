import React, { useState, useEffect, memo } from 'react';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

const sizeCache: { [key: string]: number } = {};

export const AutoHeightImage = memo(({ url }: { url: string }) => {
  const [aspectRatio, setAspectRatio] = useState(sizeCache[url] || 1.5);

  useEffect(() => {
    if (url && !sizeCache[url]) {
      Image.getSize(url, (w, h) => {
        if (w && h) {
          const ratio = w / h;
          sizeCache[url] = ratio; 
          setAspectRatio(ratio);
        }
      }, () => {
      });
    }
  }, [url]);

  return (
    <FastImage
      source={{
        uri: url,
        priority: FastImage.priority.normal,
      }}
      style={{
        width: '100%',
        aspectRatio: aspectRatio,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
});