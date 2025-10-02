import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Courses from '../components/Courses';
import { CoursesContext } from '../store/coursesContext';
import { getLastWeek } from '../helper/date';
import { useContext, useState } from 'react';
import { getCourses } from '../helper/http';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorText from '../components/ErrorText';

export default function RecentCourses() {
  const coursesContext = useContext(CoursesContext);
  const [fetchedCourses, setFetchedCourses] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function takeCourses() {
      setError(null);
      setIsFetching(true);
      try {
        const courses = await getCourses();
        coursesContext.setCourse(courses);
      } catch (error) {
        setError('Kursları çekemedik!');
      }

      setIsFetching(false);
      // setFetchedCourses(courses);
    }

    takeCourses();
  }, []);

  if (error && !isFetching) {
    return <ErrorText message={error} />;
  }

  if (isFetching) {
    return <LoadingSpinner />;
  }

  const recentCourses = coursesContext.courses.filter((course) => {
    const today = new Date();
    const dateLastWeek = getLastWeek(today, 7);

    return course.date >= dateLastWeek && course.date <= today;
  });

  return (
    <Courses
      courses={recentCourses}
      coursesPeriod="Son 1 Hafta"
      nullText="Yakın Zamanda herhangi bir kursa kaydolmadınız"
    />
  );
}

const styles = StyleSheet.create({});
