import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Card from '../Shared/card';
import { Feather } from '@expo/vector-icons';

export default function NoteDescription({ route }) {
  const {
    noteId,
    noteName,
    noteDescription,
    noteContent,
    noteCreatedAt,
    noteImage,
  } = route.params;

  return (
    <View>
      <Card>
        <Image source={{ uri: noteImage }} style={styles.logo} />
        <View style={styles.navBar}>
          <View style={styles.title}>
            <Text style={styles.h1}>{noteName}</Text>
          </View>
          <View style={styles.navBarOptions}>
            <Feather
              style={styles.navOptions}
              name='thumbs-up'
              size={24}
              color='black'
            />
            <Feather
              style={styles.navOptions}
              name='thumbs-down'
              size={24}
              color='black'
            />
            <Feather
              style={styles.navOptions}
              name='heart'
              size={24}
              color='black'
            />
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
