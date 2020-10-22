import {useState, useCallback} from 'react';
import {LayoutChangeEvent, LayoutRectangle} from 'react-native';

const _defaultRect: LayoutRectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

type UseLayoutResult = [LayoutRectangle, (e: LayoutChangeEvent) => void];

/**
 * Suitable for managing the onLayout handler of a view, as in
 *
 * const [layout, onLayout] = useLayout()
 * return <View onLayout={onLayout}>...</View>
 */
export const useLayout = (defaultRect = _defaultRect): UseLayoutResult => {
  const [rect, setRect] = useState(defaultRect);

  const onLayout = useCallback(({nativeEvent: {layout}}: LayoutChangeEvent) => {
    setRect(layout);
  }, []);

  return [rect, onLayout];
};
