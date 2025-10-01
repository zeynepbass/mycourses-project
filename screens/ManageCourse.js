import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useLayoutEffect, useContext } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { CoursesContext } from '../store/coursesContext';
import CourseForm from '../components/CourseForm';

export default function ManageCourse({ route, navigation }) {
  const coursesContext = useContext(CoursesContext);
  const courseId = route.params?.courseId;
  const isEditing = !!courseId;

  const selectedCourse = coursesContext.courses.find(
    (course) => course.id === courseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Kursu Güncelle' : 'Kurs Ekle',
    });
  }, [navigation, isEditing]);

  function deleteCourse() {
    Alert.alert(
      'Dikkat!',
      'Bu kursu silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            coursesContext.deleteCourse(courseId);
            navigation.goBack();
          },
        },
      ]
    );
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function addOrUpdateHandler(courseData) {
    if (isEditing) {
      coursesContext.updateCourse(courseId, courseData);
    } else {
      coursesContext.addCourse(courseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
        {isEditing && (
        <View style={styles.deleteContainer}>
          <Pressable
            style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
            onPress={deleteCourse}
          >
            <EvilIcons name="trash" size={36} color="white" />
          
          </Pressable>
        </View>
      )}
      <CourseForm
        buttonLabel={isEditing ? 'Güncelle' : 'Ekle'}
        onSubmit={addOrUpdateHandler}
        cancelHandler={cancelHandler}
        defaultValues={selectedCourse}
      />

    
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  deleteContainer: {
    alignSelf: 'flex-end', 
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#F97316',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});

