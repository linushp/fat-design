import { useEffect, useRef, useState } from 'react';
import { isImageValid } from '../util';

type ImageStatus = 'normal' | 'error' | 'loading';


export interface IUseStateParam {
  src?: string;
  isCustomPlaceholder?: any;
  fallback?: string;
}

export default function useStatus({
  src,
  isCustomPlaceholder,
  fallback,
}: IUseStateParam) {

  const [status, setStatus] = useState<ImageStatus>(isCustomPlaceholder ? 'loading' : 'normal');
  const isLoaded = useRef(false);
  const isError = status === 'error';

  // https://github.com/react-component/image/pull/187
  useEffect(() => {
    let isCurrentSrc = true;
    isImageValid(src).then(isValid => {
      // https://github.com/ant-design/ant-design/issues/44948
      // If src changes, the previous setStatus should not be triggered
      if (!isValid && isCurrentSrc) {
        setStatus('error');
      }
    });
    return () => {
      isCurrentSrc = false;
    };
  }, [src]);

  useEffect(() => {
    if (isCustomPlaceholder && !isLoaded.current) {
      setStatus('loading');
    } else if (isError) {
      setStatus('normal');
    }
  }, [src]);

  const onLoad = () => {
    setStatus('normal');
  };

  const getImgRef = (img?: HTMLImageElement | null) => {
    isLoaded.current = false;
    if (status === 'loading' && img?.complete && (img.naturalWidth || img.naturalHeight)) {
      isLoaded.current = true;
      onLoad();
    }
  };

  const srcAndOnload = isError && fallback ? { src: fallback } : { onLoad, src };

  return [getImgRef, srcAndOnload, status] as const;
}
