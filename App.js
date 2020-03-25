/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Routes from './src/settings/Routes';

const App = () => {
  return (
    <>
      <View style={{ flex: 1 }} >
        <StatusBar backgroundColor="#1aa180" barStyle="light-content" />
        <Routes />
      </View>
    </>
  )
}

export default App;
