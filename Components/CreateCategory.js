import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,TextInput } from 'react-native';
import { Button,Card } from 'react-native-material-ui';
import {AsyncStorage} from 'react-native';

export default function CreateCategory(){
    const[cname,setCname]=useState('enter category name here')
    const[category,setCategory]=useState([])


    useEffect(()=>{
        console.log("in effect");
        getData();
      },[]);

    async function getData(){
        try{
            let value=await AsyncStorage.getItem('categoryList');
            if(value!==null){
                console.log("effect worked");
                setCategory(JSON.parse(value));
            }
        }
        catch(error){
            console.log(error)
        }
    }

    _storeData = async(name) => {
        category.push(name);
        console.log(category);
        try{
            await AsyncStorage.setItem('categoryList',JSON.stringify(category));
            console.log("succses");
        }
        catch(error){
            console.log(error);
        }
    }

    _retrieveData=async()=>{
        try{
            const value =await AsyncStorage.getItem('categoryList');
            if(value!== null){
                console.log(category);
                setCategory(JSON.parse(value));
            }
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.input}>
                <Text>Title</Text>
                <TextInput onChangeText={text=>setCname(text)} value={cname} />
            </View>

            <View style={styles.buttons}>
                <Button text="create" icon="add-circle" onPress={()=>_storeData(cname)} />
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
  input:{
    flex:1,
    alignSelf:'flex-start',
  },    
  buttons:{
      flex:0,
      alignSelf:'center'
  }
  });