import React, {Component} from 'react';
import api from '../services/api';

import {
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Timeline extends Component {
  static navigationOptions = {
    title: 'Início',
    headerTitleAlign: 'center',
    headerRight: () => (
      <TouchableOpacity onPress={() => {}}>
        <Icon
          style={{marginRight: 10}}
          name="add-circle-outline"
          size={24}
          color="#4BB0EE"
        />
      </TouchableOpacity>
    ),
  };

  state = {
    tweets: [],
  };

  componentDidMount() {
    this.getTweets();
  }

  getTweets = async () => {
    try {
      const {data: tweets} = await api.get('/tweets');
      this.setState({tweets});
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {tweets} = this.state;
    return (
      <View>
        {tweets.map(tweet => (
          <Text>{tweet.content}</Text>
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
