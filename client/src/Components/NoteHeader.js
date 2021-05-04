import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export const NoteHeader = ({ notes }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image style={styles.logo} source={{ uri: notes.noteImage }} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.h1}>{notes.noteName}</Text>
        <Text numberOfLines={4}>{notes.noteDescription}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 102.5,
    borderRadius: 5,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
  },
  textBox: {
    flexShrink: 1,
    width: '100%',
    marginHorizontal: 10,
  },
  h1: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  imageBox: {
    // position: 'absolute',
    // right: 0,
  },
});
