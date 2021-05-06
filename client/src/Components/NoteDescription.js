import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../Shared/card';
import { Feather } from '@expo/vector-icons';
import { voteUp, voteDown } from '../Services/noteAPI';

export default function NoteDescription({ route }) {
  const {
    noteId,
    noteName,
    noteDescription,
    noteContent,
    noteCreatedAt,
    noteImage,
  } = route.params;

  const voteUpHandler = async () => {
    try {
      await voteUp(noteId);
    } catch (err) {
      console.log(err);
    }
  };

  const voteDownHandler = async () => {
    try {
      await voteDown(noteId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Card>
        <Image source={{ uri: noteImage }} style={styles.logo} />
        <View style={styles.navBar}>
          <View style={styles.title}>
            <Text style={styles.h1}>{noteName}</Text>
          </View>
          <View style={styles.navBarOptions}>
            <TouchableOpacity onPress={voteUpHandler}>
              <Feather
                style={styles.navOptions}
                name='thumbs-up'
                size={24}
                color='black'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={voteDownHandler}>
              <Feather
                style={styles.navOptions}
                name='thumbs-down'
                size={24}
                color='black'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('fav')}>
              <Feather
                style={styles.navOptions}
                name='heart'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text>#{noteId}</Text> */}
        <Text>{noteDescription}</Text>
        <Text>{noteContent}</Text>
        <Text style={styles.italic}>{noteCreatedAt}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  italic: {
    fontStyle: 'italic',
  },
  navBar: {
    flexDirection: 'row',
    textAlign: 'left',
  },
  navBarOptions: {
    flexDirection: 'row',
    marginLeft: 'auto',
    textAlign: 'left',
  },
  navOptions: {
    margin: 5,
  },
});
