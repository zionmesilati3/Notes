import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import { ActionButton,Card,Button } from 'react-native-material-ui';
import { reset } from 'expo/build/AR';
import {AsyncStorage} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function NoteCard({route,navigation}){
    const [note,setNote]=useState(route.params.NoteC);


    async function updateNote(note,upNote){
        try{
          let arr=[];
            let value=await AsyncStorage.getItem('noteList');
            JSON.parse(value).map((n)=>{
              if(n.category===note.category && n.content===note.content && n.title===note.title && n.photo===note.photo){
                arr.push(upNote);
              }
              else{
                arr.push(n);
              }
            })
            setNote(upNote);
        }
        catch(error){
          console.log(error);
        }
      }

    return(
        <View style={styles.con}>
            <View style={styles.con}>
                <View style={styles.view}>
                    <Card style={{container:{backgroundColor:'#3838c7'}}}><Text style={styles.title}>{note.title}</Text></Card>
                </View>

                <View style={styles.content}>
                    <Card style={{container:{backgroundColor:'#3838c7',alignSelf:'stretch'}}}><Text style={styles.content}>{note.content}</Text></Card>
                </View>
            </View>

            {note.photo && (<Image source={{uri:note.photo}} style={styles.image}/> )}

<Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        alignSelf:'center'
    },
    viewB:{
        alignContent:'stretch',
        backgroundColor:'#5af',
    },
    con:{
        flex:1,
        backgroundColor:'#5af',
    },
    image:{
        width:380,
        height:300,
        alignSelf:'center'
      },
    view:{
        borderWidth:1,
        alignSelf:'stretch'
    },  
    title:{
        fontSize:24,
        fontWeight:'bold',
        alignSelf:'center',
    },
    content:{
        flex:1,
        fontSize:20,
        alignSelf:'flex-start',
    }
});