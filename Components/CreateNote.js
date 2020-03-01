import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,TextInput,Image } from 'react-native';
import { ActionButton,Button,Card } from 'react-native-material-ui';
import {AsyncStorage} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default function CreateCategory({route,navigation}){
    const[ntitle,setNtitle]=useState('enter title')
    const[content,setcontent]=useState('enter note content')
    const[note,setNote]=useState([])
    const[photo,setPhoto]=useState(null)

    useEffect(()=>{
        getPermissionAsync();
        console.log("in effect");
        getData();
      },[]);

      getPermissionAsync = async() => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }

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

    _storeData = async(title,content,photo) => {  /* the n is an array of notes which has category,title,content and picture*/
        let n={category : route.params.categoryName , title : title , content : content , photo : photo}
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

    handleChoosePhoto = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        });
        console.log("result!!",result);
        if(!result.cancelled){
            setPhoto(result.uri);
        }
        console.log(photo)
      };

    return(
        <View style={styles.container}>

            <View style={styles.create}>
                
                <Text style={styles.title}>Title</Text>
                <Card style={{container:{backgroundColor:'#3838c7'}}}><TextInput onChangeText={text=>setNtitle(text)} value={ntitle} /></Card>
                <Card style={{container:{backgroundColor:'#3838c7'}}}><TextInput multiline numberOfLines={4} onChangeText={text=>setcontent(text)} value={content} /></Card>
                <Text></Text>
                <View style={styles.buttons}>
                <Button text="pick a picture" icon="insert-photo" onPress={()=>handleChoosePhoto()} style={styles.buttons} />
                </View>
                <Text></Text>
                <View>
                {photo && (<Image source={{uri:photo}} style={styles.image}/> )}
                </View>
            </View>

 
                <ActionButton style={{container:{backgroundColor:'#3838c7'}}} icon="add" onPress={()=>_storeData(ntitle,content,photo)} />
 

            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#5af',
  },
  image:{
    width:380,
    height:300,
    alignSelf:'center'
  },
    buttons:{
        flex:0,
        alignSelf:'center',
        borderWidth:1
    },
    create:{
        flex:1,
        alignSelf:'stretch'
    },
    title:{
        alignSelf:'center',
    }
  });