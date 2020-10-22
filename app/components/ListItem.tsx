import {useLayout} from 'app/hooks/useLayout';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Easing,
  View,
} from 'react-native';
import {Item, ListContext} from './ListProvider';

interface Props {
  item: Item;
  index: number;
}

export const ListItem: React.FC<Props> = ({item}) => {
  const [rect, onLayout] = useLayout();
  const [touchStart, setTouchStart] = useState(0);
  const touchDelta = useRef(0);
  const isAnimating = useRef(false);
  const [deleting, setDeleting] = useState(false);

  const [anims] = useState(() => ({
    item: new Animated.Value(1),
    button: new Animated.Value(0),
  }));

  // useEffect(() => {
  //   const id = anims.button.addListener(({value}) =>
  //     console.log(value - touchStart),
  //   );
  //   return () => anims.button.removeListener(id);
  // }, []);

  const {deleteItem} = useContext(ListContext);

  const onDelete = () => {
    isAnimating.current = true;
    setDeleting(true);
    Animated.timing(anims.item, {
      duration: 350,
      toValue: 0,
      useNativeDriver: true,
      // easing: Easing.bezier(0.0, 0.5, 0.5, 1),
    }).start(() => {
      isAnimating.current = false;
      deleteItem(item.id);
    });
  };

  return (
    <Animated.View
      onLayout={onLayout}
      onTouchStart={({nativeEvent: e}) => {
        if (touchDelta.current !== 0) {
          isAnimating.current = true;
          Animated.spring(anims.button, {
            toValue: 0,
            friction: 10,
            tension: 100,
            useNativeDriver: true,
          }).start(() => {
            isAnimating.current = false;
          });
        }
        setTouchStart(e.locationX);
      }}
      onTouchMove={({nativeEvent: e}) => {
        if (isAnimating.current && e.locationX > touchStart) {
          return;
        }
        touchDelta.current = Math.min(
          0,
          Math.max(e.locationX - touchStart, -rect.height),
        );
        anims.button.setValue(touchDelta.current);
      }}
      onTouchEnd={() => {
        const value = Math.abs(touchDelta.current) / rect.height;
        if (value < 1 && value > 0) {
          if (value < 0.75) {
            isAnimating.current = true;
            Animated.spring(anims.button, {
              toValue: 0,
              friction: 10,
              tension: 100,
              useNativeDriver: true,
            }).start(() => {
              isAnimating.current = false;
              touchDelta.current = 0;
            });
          } else {
            isAnimating.current = true;
            Animated.spring(anims.button, {
              toValue: -rect.height,
              friction: 10,
              tension: 100,
              useNativeDriver: true,
            }).start(() => {
              isAnimating.current = false;
              touchDelta.current = -rect.height;
            });
          }
        }
      }}
      style={[
        styles.container,
        {
          opacity: anims.item,
          transform: [
            {
              translateX: anims.item.interpolate({
                inputRange: [0, 1],
                outputRange: [-rect.width, 0],
              }),
            },
          ],
        },
      ]}>
      <Text style={styles.name}>{item.name}</Text>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [
              {
                translateX: anims.button.interpolate({
                  inputRange: [-rect.height, 0],
                  outputRange: [rect.width - rect.height, rect.width],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        {!deleting && (
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    overflow: 'hidden',
    backgroundColor: '#222',
    marginVertical: 4,
    marginHorizontal: 12,
    paddingHorizontal: 8,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  name: {
    color: 'white',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#f00',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  deleteText: {
    color: 'white',
  },
});
