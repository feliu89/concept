import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../Shared/card';
import { Feather } from '@expo/vector-icons';
import {
  voteUp,
  voteDown,
  toogleFavourite,
  getSocials,
} from '../Services/noteAPI';

export default function NoteDescription({ route }) {
  const {
    noteId,
    noteName,
    noteDescription,
    noteContent,
    noteCreatedAt,
    noteImage,
  } = route.params;
  const [socials, setSocials] = useState({});

  useEffect(() => {
    getActualState();
  }, []);

  const getActualState = async () => {
    await getSocials(noteId).then((resp) => setSocials(resp));
  };

  const voteHandler = async (voteType) => {
    try {
      await voteUp(noteId, voteType);
      await getActualState();
    } catch (err) {
      console.log(err);
    }
  };

  const FavouriteHandler = async () => {
    try {
      await toogleFavourite(noteId);
      await getActualState();
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
            <TouchableOpacity onPress={() => voteHandler('up')}>
              <Feather
                style={styles.navOptions}
                name='thumbs-up'
                size={24}
                color={
                  socials.UserSocialsThumbsState === 'up' ? 'blue' : 'black'
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => voteHandler('down')}>
              <Feather
                style={styles.navOptions}
                name='thumbs-down'
                size={24}
                color={
                  socials.UserSocialsThumbsState === 'down' ? 'blue' : 'black'
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={FavouriteHandler}>
              <Feather
                style={styles.navOptions}
                name='heart'
                size={24}
                color={socials.UserSocialsFavourite ? 'red' : 'black'}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text>#{noteId}</Text> */}
        <Text>{noteDescription}</Text>
        <Text>{noteContent}</Text>
        <Text style={styles.italic}>{noteCreatedAt}</Text>
        <Text style={styles.italic}>{socials.UserSocialsFavourite}</Text>
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
