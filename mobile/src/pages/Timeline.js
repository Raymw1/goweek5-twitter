import React, {Component} from 'react';
import api from '../services/api';
import socket from 'socket.io-client';
import {API_URL} from '@env';

import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Tweet from '../components/Tweet';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Timeline extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Início',
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.setItem('@GoTweet:username', '');
          navigation.navigate('Login');
        }}>
        <Icon
          style={{marginLeft: 10}}
          name="logout"
          size={24}
          color="#4BB0EE"
        />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon
          style={{marginRight: 10}}
          name="add-circle-outline"
          size={24}
          color="#4BB0EE"
        />
      </TouchableOpacity>
    ),
  });

  state = {
    tweets: [],
  };

  componentDidMount() {
    this.subscribeToEvents();
    this.getTweets();
  }

  subscribeToEvents = () => {
    const io = socket(API_URL);
    io.on('tweet', data => {
      this.setState({tweets: [data, ...this.state.tweets]});
    });
    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet,
        ),
      });
    });
  };

  getTweets = async () => {
    try {
      const {data: tweets} = await api.get('/tweets');
      this.setState({tweets});
    } catch (error) {
      console.error(error);
    }
  };

  handleLogout = () => {};

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({item}) => <Tweet tweet={item} />}
        />
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
