import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const backgroundColor = '#FFF';
const styles = StyleSheet.create({
  card: {
    elevation: 1,
    backgroundColor: backgroundColor,
    marginVertical: 5,
  },
  cardContent: {},
});
