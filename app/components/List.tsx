import React, {useContext} from 'react';
import {Animated, ListRenderItemInfo} from 'react-native';
import {ListItem} from './ListItem';
import {Item, ListContext} from 'app/components/ListProvider';

interface Props {}

const renderItem = ({item, index}: ListRenderItemInfo<Item>) => {
  return <ListItem item={item} index={index} />;
};

const keyExtractor = (item: Item, index: number) => item.id;

export const List: React.FC<Props> = () => {
  const {list} = useContext(ListContext);

  return (
    <Animated.FlatList
      data={list}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};
