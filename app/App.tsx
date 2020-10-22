/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {List} from './components/List';
import {ListProvider} from './components/ListProvider';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ListProvider>
        <List />
      </ListProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
});

export default App;
