import React, { useState, useEffect, useRef } from 'react';
import {
  Platform,
  Button,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Text,
  TextInput,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { postNote, postImage } from '../Services/noteAPI';
import * as ImagePicker from 'expo-image-picker';

const createFormData = (photo) => {
  const data = new FormData();
  data.append('photo', {
    uri: photo.uri,
    name: photo.uri.split('/').pop(),
    type: photo.type,
  });
  return data;
};

export default function Note() {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = useState(null);

  const handleSave = () => {
    let imageName = 'none';
    if (image) {
      console.log('inside');
      const noteImage = image.uri.split('/').pop();
      const createdFile = createFormData(image);
      imageName = createdFile._parts[0][1].name;
      postImage(createdFile);
      setImage(null);
    }
    postNote({ name, description, noteImage: imageName });
    Alert.alert('Note saved');
    setName('');
    setDescription('');
  };

  const handleClear = () => {
    setName('');
    setDescription('');
    setImage(null);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result);
    }
  };

  const ref_input2 = useRef();

  return (
    <>
      <View>
        <TouchableHighlight onPress={() => pickImage()}>
          {image ? (
            <Image
              source={{ uri: image.uri }}
              style={{
                width: '100%',
                height: 200,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                overflow: 'hidden',
              }}
              resizeMode='cover'
            />
          ) : (
            <Text>Add cover</Text>
          )}
        </TouchableHighlight>
      </View>
      <View>
        <TextInput
          className='title'
          style={styles.noteTitleText}
          onChangeText={setName}
          value={name}
          placeholder='Untitled idea...'
          returnKeyType='next'
          onSubmitEditing={() => ref_input2.current.focus()}
        />
      </View>
      <ScrollView style={styles.noteContent}>
        <TextInput
          multiline={true}
          style={styles.noteContentText}
          onChangeText={setDescription}
          value={description}
          placeholder='Tap here to add description...'
          ref={ref_input2}
        />
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flex: 1,
            margin: 10,
          }}
        >
          <Button title='Clear' onPress={handleClear} color='tomato' />
        </View>
        <View
          style={{
            flex: 1,
            margin: 10,
          }}
        >
          <Button title='Save' onPress={handleSave} color='tomato' />
        </View>
      </View>
    </>
  );
}

const colorBlack = '#000';
const colorTomato = 'tomato';
const colorShadowGrey = 'rgba(158, 150, 150, 0.25)';

const styles = StyleSheet.create({
  topNav: {
    height: '12%',
    flexDirection: 'row',
    paddingTop: 50,
    paddingLeft: 30,
    borderBottomWidth: 1,
    shadowColor: colorShadowGrey,
  },
  item: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  noteTitle: {
    height: '15%',
  },
  noteTitleText: {
    height: 75,
    fontSize: 30,
    fontWeight: 'bold',
    color: colorBlack,
    padding: 15,
  },
  noteContent: {
    height: '75%',
  },
  noteContentText: {
    fontSize: 15,
    color: colorBlack,
    padding: 15,
  },
});
