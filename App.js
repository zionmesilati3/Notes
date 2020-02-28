import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import myNotes from './Components/myNotes.js';
import Category from './Components/Category.js';
import CreateCategory from './Components/CreateCategory.js';
import CreateNote from './Components/CreateNote.js';
import NoteCard from './Components/NoteCard.js';

 
const Stack = createStackNavigator();

export default function App() {
  
  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="My Notes">
        <Stack.Screen name="My Notes" component={myNotes} />
        <Stack.Screen name="CCategory" component={CreateCategory} />
        <Stack.Screen name="Category" component={Category} options={({route})=>({title:route.params.name})} />
        <Stack.Screen name="CNote" component={CreateNote} />
        <Stack.Screen name="NoteCard" component={NoteCard} />
      </Stack.Navigator>

    </NavigationContainer>

  );
}


