import React,{useState, useEffect} from 'react';
import { View, Text,StyleSheet } from 'react-native';
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
              if(n.category===note.category && n.content===note.content && n.title===note.title){
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
                    <Text style={styles.title}>{note.title}</Text>
                </View>

                <View style={styles.content}>
                    <Card><Text style={styles.content}>{note.content}</Text></Card>
                </View>
            </View>

            <Text>still need to work on this update screen thing</Text>
            
            <View style={styles.viewB}>
                <Button style={styles.button} icon="update" text="update" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        alignSelf:'center'
    },
    viewB:{
        alignSelf:'stretch',
        backgroundColor:'#fff',
        borderWidth:2
    },
    con:{
        flex:1,
        backgroundColor:'#5af',
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