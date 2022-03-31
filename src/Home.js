import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ActionButton from 'react-native-action-button';
import { useNavigation} from '@react-navigation/native';

import Axios from 'axios';


const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get("http:localhost:3000/products").then((res)=>{
      setProducts(res.data)
    }).catch((error) => alert("Erro de requisição! "))
   }, [route.params?.res])
 
 const navigation = useNavigation();
 
  return (
    <View style={styles.container} >
  
      <View style={{flexDirection: 'row', alignItems:"center", justifyContent:'center'   }}>
      <Text style={styles.texto}>Itens de Estoque </Text>
      </View>
     
      <FlatList style ={styles.input} 
      keyExtractor={(item, index) => item.id.toString()}
      data={products}
      renderItem={({ item }) =>{
        <TouchableOpacity onPress={()=>navigation.navigate('Editar', {product:item})}  style={{flexDirection: 'row', backgroundColor: 'white', marginBotton: 5}}>
              <Image source={{uri:item.img ? item.img:null}} style={{ width:100, height: 100, margin: 10}}/> 
          <View style ={styles.texto1}>
              <Text> Produto: {null}</Text>
              <Text> Descrição: {null}</Text>
              <Text> Categoria: {null}</Text>
              <Text> Preço: R$ {null}</Text>
          </View>
        </TouchableOpacity>
     
      }}/>
      <ActionButton onPress={() => navigation.navigate('Cadastro')}  buttonColor='#4169e1' style={styles.btn}/>
    </View>
    )
  }
  const styles = StyleSheet.create({
    container:{
      width: '100%',
      height:'100%',
      alignItems: 'center'
    },
    container1:{
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    texto: {
      color:'#4F4F4F',
      fontSize: 32,
      fontWeight: 'bold',
      marginVertical: 10,
      textAlign:'center',
    },
    texto1: {
      color:'#4F4F4F',
      fontSize: 25,
      fontWeight: 'bold',
      marginVertical: 10,
      textAlign:'center',
    },
    input: {
      backgroundColor: '#DCDCDC',
      color:'gray',
      borderRadius: 20,
      keyboardType:'numeric',
      marginVertical:10,
      padding: 20,
      textAlign:'center',
      width: '90%',
      border: 1
    },
    btn: {
      color:'blue',
     fontSize: 20,
      flexDirection: 'row',
      alignContent:'center'
    }
  })
  
  export default Home;
  