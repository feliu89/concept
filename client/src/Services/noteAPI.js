import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

let userJWT = '';

(async () => {
  try {
    const value = await AsyncStorage.getItem('@jwtToken');
    if (value !== null) userJWT = value;
    if (value == null) console.log(value);
  } catch (err) {
    console.log(err);
  }
})();

export const getNote = async () => {
  try {
    const response = fetch(`${BASE_URL}/note`).then((data) => data.json());
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const postNote = async (note) => {
  try {
    const response = await fetch(`${BASE_URL}/note`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: userJWT,
      },
      body: JSON.stringify({
        noteName: note.name,
        noteDescription: note.description,
        noteImage: note.noteImage,
      }),
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const postImage = async (image) => {
  try {
    fetch(`${BASE_URL}/image/upload`, {
      method: 'POST',
      body: image,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log('error', error);
      });
  } catch (e) {
    console.log(e);
  }
};

export const voteUp = async (noteId) => {
  console.log(`${noteId}`);
  try {
    fetch(`${BASE_URL}/note/${noteId}/vote/up`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: userJWT,
      },
    }).catch((error) => {
      console.log('error', error);
    });
  } catch (e) {
    console.log(e);
  }
};

export const voteDown = async (noteId) => {
  try {
    fetch(`${BASE_URL}/note/${noteId}/vote/down`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: userJWT,
      },
    }).catch((error) => {
      console.log('error', error);
    });
  } catch (e) {
    console.log(e);
  }
};
