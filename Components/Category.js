import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { ActionButton,Card,Button } from 'react-native-material-ui';
import { reset } from 'expo/build/AR';
import {AsyncStorage} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



export default function Category({route,navigation}) {
  const [notes,setNotes]= useState(route.params.Nlist)
/*
  this function is like component will update and can also act as component did mount
  that function help reset the page after you go back
*/
  useEffect(()=>{
    const reScreen = navigation.addListener('focus',()=>{
      getNotes();
    });
    return reScreen;
  });


/*
  thats the function thats delete the notes
  it also does a reset to state after it delete the note
*/
async function delNote(note){
  try{
    let arr=[];
    let arr2=[];
      let value=await AsyncStorage.getItem('noteList');
      JSON.parse(value).map((n)=>{
        if(n.category===note.category && n.content===note.content && n.title===note.title){
          console.log("object with title: "+ n.title +" was deleted");
        }
        else{
          arr.push(n);
        }
      })
      await AsyncStorage.setItem('noteList',JSON.stringify(arr));
      arr.map((n)=>{
        if(n.category===route.params.name){
          arr2.push(n);
        }
      });
      setNotes(arr2);
  }
  catch(error){
    console.log(error);
  }
}

/*
  this function is used to get the notes with the proper category and reset the state so the screen render
*/

  async function getNotes(){
    try{
      let arr=[];
      let value=await AsyncStorage.getItem('noteList');
      JSON.parse(value).map((n)=>{
        if(n.category===route.params.name){
        arr.push(n);}
      });
      if(arr.length!==notes.length){
        setNotes(arr);
      }
    }
    catch(error){
      console.log(error);
    }
  }

/*
  about to be the navigation button to enter the note itself
*/
const MoveToNote=(note)=>{
  navigation.navigate('NoteCard',{NoteC:note})
}

  return (
  <View style={styles.container}>
  <ScrollView style={styles.container}>
    <View style={styles.con1}>
      <Text style={styles.header}>{route.params.name} Notes:</Text>
      {notes.map((n,key)=><Card key={key} style={styles.container2} onPress={()=>MoveToNote(n)}><Text style={styles.secH}>{n.title}</Text><Button onPress={()=>delNote(n)} icon="delete" text="delete"/></Card>)}
    </View>
    </ScrollView>
    
      <View style={styles.con}>
        <ActionButton onPress={()=>navigation.navigate('CNote',{categoryName:route.params.name})} />
      </View>

    </View>
  );
}

/*
  just some styles i need to work on that
*/

const styles = StyleSheet.create({
  header:{
    flex:0,
    fontSize:32,
    fontWeight:'bold',
    alignSelf:'center',
  },
  con:{
    borderWidth:1,
    alignItems: 'center',
    alignContent:'center',
    alignSelf:'flex-end',
    justifyContent: 'flex-end'
  },
  con1:{
    flex:1
  },
  container2:{
    flex:1,
    borderWidth:1,
    alignSelf:'stretch',
    borderColor:'red'
  },
  secH: {
    flex: 0,
    fontSize:24,
    fontWeight:'bold',
    alignSelf:'center',
  },
  container:{
    flex:1,
    backgroundColor:'#5af',
}
});