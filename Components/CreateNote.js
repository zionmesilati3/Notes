import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,TextInput } from 'react-native';
import { Button,Card } from 'react-native-material-ui';
import {AsyncStorage} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default function CreateCategory({route,navigation}){
    const[ntitle,setNtitle]=useState('enter title')
    const[content,setcontent]=useState('enter note content')
    const[note,setNote]=useState([])

    useEffect(()=>{
        console.log("in effect");
        getData();
      },[]);

    async function getData(){
        try{
            let value=await AsyncStorage.getItem('noteList');
            if(value!==null){
                console.log("effect worked from create note");
                setNote(JSON.parse(value));
            }
        }
        catch(error){
            console.log(error)
        }
    }

    _storeData = async(title,content) => {/* the n is an array of notes which has category,title,content*/
        let n={category:route.params.categoryName,title:title,content:content}
        note.push(n);
        console.log(note);
        try{
            await AsyncStorage.setItem('noteList',JSON.stringify(note));
            console.log("succses note");
        }
        catch(error){
            console.log(error);
        }
    }

    _retrieveData=async()=>{
        try{
            const value =await AsyncStorage.getItem('noteList');
            if(value!== null){
                console.log(note);
                setNote(JSON.parse(value));
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.create}>
                
                <Text style={styles.title}>Title</Text>
                <TextInput onChangeText={text=>setNtitle(text)} value={ntitle} />
                <TextInput multiline numberOfLines={4} onChangeText={text=>setcontent(text)} value={content} />
                
            </View>

            <View style={styles.buttons}>
                <Button text="create" icon="add-circle" onPress={()=>_storeData(ntitle,content)} />
                <Button text="show item in storage" icon="movie" onPress={()=>_retrieveData()} />
                <Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#5af',
  },
    buttons:{
        flex:0,
        alignSelf:'center'
    },
    create:{
        flex:1,
        alignSelf:'stretch'
    },
    title:{
        alignSelf:'center',
    }
  });