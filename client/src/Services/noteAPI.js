import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'whatever',
};

(async () => {
  try {
    const userJWT = await AsyncStorage.getItem('@jwtToken');
    if (userJWT !== null) defaultHeaders.Authorization = userJWT;
    else console.log('COULD NOT GET A JWT!!!, instead: ', userJWT);
  } catch (err) {
    console.log(err);
  }
})();

export const getNote = async () => {
  try {
    const response = await fetch(`${BASE_URL}/note`, {
      headers: defaultHeaders,
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const postNote = async (note) => {
  try {
    const response = await fetch(`${BASE_URL}/note`, {
      method: 'POST',
      headers: defaultHeaders,
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
    const response = await fetch(`${BASE_URL}/image/upload`, {
      method: 'POST',
      body: image,
      headers: {
        'Content-Type': 'multipart/form-data',
        // ...defaultHeaders,
      },
    });
    await console.log(response);
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const vote = async (noteId, voteType) => {
  try {
    const response = await fetch(
      `${BASE_URL}/note/${noteId}/vote/${voteType}`,
      {
        method: 'PUT',
        headers: defaultHeaders,
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const toogleFavourite = async (noteId) => {
  try {
    const response = await fetch(`${BASE_URL}/note/${noteId}/favourite`, {
      method: 'PUT',
      headers: defaultHeaders,
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

export const getSocials = async (noteId) => {
  try {
    const response = await fetch(`${BASE_URL}/note/${noteId}/socials`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};
