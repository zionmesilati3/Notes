import React,{useState,useEffect} from 'react';
import { View, Text,StyleSheet,TextInput } from 'react-native';
import { Button,Card,ActionButton } from 'react-native-material-ui';
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
                <Card style={{container:{backgroundColor:'#3838c7',alignSelf:'stretch'}}}><TextInput onChangeText={text=>setCname(text)} value={cname} /></Card>
            </View>


                <ActionButton style={{container:{backgroundColor:'#3838c7'}}} icon="add" onPress={()=>_storeData(cname)} />

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
    alignSelf:'stretch',
  },    
  buttons:{
      flex:0,
      alignSelf:'center'
  }
  });