import { Pressable, StyleSheet, View, Image,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';

import ManageCourse from './screens/ManageCourse';
import RecentCourses from './screens/RecentCourses';
import AllCourses from './screens/AllCourses';
import CoursesContextProvider from './store/coursesContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CourseOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: 'white' },
        headerTintColor: 'black',
        tabBarStyle: { backgroundColor: 'white', height: 60 },
        tabBarActiveTintColor: '#F97316',
        headerRight: () => (
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => navigation.navigate('ManageCourse')}
          >
            <View style={styles.iconContainer}>
              <AntDesign name="plus" size={24} color="orange" />
            </View>
          </Pressable>
        ),
      })}
    >

      <Tab.Screen
        name="Şuanki"
        component={RecentCourses}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/hourglass.gif')}
              style={{
                width: focused ? 32 : 28, 
                height: focused ? 32 : 28,
              }}
            />
          ),
        }}
      />


      <Tab.Screen
        name="Tümü"
        component={AllCourses}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="world-o" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CoursesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tümü"
            component={CourseOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ManageCourse" component={ManageCourse} />
        </Stack.Navigator>
      </NavigationContainer>
    </CoursesContextProvider>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  iconContainer: {
    marginHorizontal: 8,
    marginVertical: 2,
  },
});
