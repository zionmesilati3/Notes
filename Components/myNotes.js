import React,{useState,useEffect} from 'react';
import { View,StyleSheet,Text} from 'react-native';
import { Button,Card,ActionButton } from 'react-native-material-ui';
import { AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function myNotes({navigation}) {
  
  useEffect(()=>{
    const reScreen = navigation.addListener('focus',()=>{
      getCategories();
      getNotes();
    });
    return reScreen;
  });

  const [categories,setCategories]=useState([])
  const [notes,setNotes]=useState([])



  useEffect(()=>{
    console.log("in effect at my notes");
    getCategories();
    getNotes();
  },[]);



async function getNotes(){
  try{
    let value=await AsyncStorage.getItem('noteList');
    if(value!==null){
      setNotes(JSON.parse(value));
      console.log("notes load succses");
    }
  }
  catch(error){
    console.log(error)
  }
}

async function getCategories(){
    try{
        let value=await AsyncStorage.getItem('categoryList');
        if(value!==null){
            setCategories(JSON.parse(value));
        }
    }
    catch(error){
        console.log(error)
    }
}

let arr=[];

function getCN(c){
  arr=[];
  notes.map((n)=>{if(n.category===c)
  arr.push(n)});
  return (arr)
}


  nav=(Cname,arr)=>(
    navigation.navigate('Category',{name:Cname,Nlist:arr})
  )


  return (
        <View style={styles.container}>
          <ScrollView style={styles.container}>
            <View style={styles.container2}>
              <Text style={styles.header}>Categories</Text>
              <View style={{flex:1}}>
                {categories.map((c,key)=><Card style={{container:{backgroundColor:'#3838c7'}}} key={key} onPress={()=>nav(c,getCN(c))}><Text style={styles.categories}>{c} {getCN(c).length}</Text></Card>)}
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.act}>
            <ActionButton style={{container:{backgroundColor:'#3838c7'}}} onPress={()=>navigation.navigate('CCategory')} color="primary" />
          </View>
        </View>
  );
}




const styles = StyleSheet.create({
  header:{
    flex:0,
    fontSize:32,
    fontWeight:'bold',
    alignSelf:'center'
  },
  container2:{
    flex:1,
    justifyContent:'flex-start',
  },
  card:{
    alignSelf:'stretch',
  },
  categories:{
    fontSize:24,
    alignSelf:'center',
    
  },
  act:{
    alignSelf:'flex-end',
    justifyContent: 'flex-end',
  },
  container:{
    flex:1,
    backgroundColor:'#5af',
}
});