import React, { useState, useEffect } from 'react';
import { Button, View, FlatList, TouchableOpacity } from 'react-native';
import Card from '../Shared/card';
import { getNote } from '../Services/noteAPI';
import { NoteHeader } from '../Components/NoteHeader';

export default function Home({ navigation }) {
  const [note, setNote] = useState([]);

  const getNoteHandler = async () => {
    getNote()
      .then((response) => setNote(response))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNoteHandler();
  }, []);

  const loggy = () => {
    console.log('loggy');
  };
  return (
    <View>
      {/* <Button title='Refresh' onPress={getNoteHandler} /> */}
      <FlatList
        data={note}
        keyExtractor={(item) => item.noteId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('NoteDescription', {
                ...item,
                loggyFun: loggy,
              })
            }
          >
            <Card>
              <NoteHeader notes={item} />
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
