import React from 'react';
import { Button, Text, Card, Avatar, FormInput, FormLabel } from 'react-native-elements';
import { View, ScrollView, Platform, Image, FlatList, TouchableOpacity, CameraRoll } from 'react-native';
import styles from '../MainPageStyle';

export default class ChatTab extends React.Component {
  render() {
    return (
      <View style={styles.tabContainer}>
        <Text style={styles.tabHeader}>Chat</Text>
      </View>
    );
  }
}
