import { BASE_URL } from '@env';
import aws from 'aws-sdk';
import { ACCES_KEY_ID, SECRET_ACCESS_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';

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

export function getNote() {
  return fetch(`${BASE_URL}/note`).then((data) => data.json());
}

export const postNote = async (note) => {
  console.log(userJWT);
  try {
    const response = await fetch(`${BASE_URL}/note`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: userJWT,
      },
      body: JSON.stringify({
        noteName: note.name,
        noteDescription: note.description,
        noteImage: note.noteImage,
      }),
    });
    return response.json();
  } catch (e) {
    console.log('e');
  }
};

export function postImage(image) {
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
}

export function getNoteId(id) {
  return fetch(`${BASE_URL}/${id}`)
    .then((data) => data.json())
    .catch((err) => console.error(err));
}

export function getImagefromS3(key) {
  try {
    aws.config.update({
      accessKeyId: `${ACCES_KEY_ID}`,
      secretAccessKey: `${SECRET_ACCESS_KEY}`,
      region: 'eu-west-1',
    });
  } catch (e) {
    console.log(e);
  }

  const s3 = new aws.S3();
  const params2 = { Bucket: 'cw-concept', Key: key };

  return new Promise((resolve, reject) => {
    s3.getObject(params2, function (err, data) {
      if (err) reject(err);
      else {
        const buffer = Buffer.from(data.Body);
        const base64ImageData = buffer.toString('base64');
        const result = `data:${data.ContentType};base64,${base64ImageData}`;
        resolve(result);
      }
    });
  });
}
