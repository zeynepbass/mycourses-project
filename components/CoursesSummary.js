import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function CoursesSummary({ periodName, courses }) {
  const coursesSum = courses.reduce((sum, course) => sum + course.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{periodName}</Text>
      <Text style={styles.cost}>{coursesSum} TL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4B5563',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 6,
  },
  title: {
    color: '#F3F4F6', 
    fontSize: 14,
    fontWeight: '500',
  },
  cost: {
    color: '#F3F4F6',
    fontSize: 16,
    fontWeight: '700',
  },
});
