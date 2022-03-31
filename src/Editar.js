import React, {useState, useEffect} from 'react';
import {View, Image,  Text, TextInput,StyleSheet, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {TextInputMask} from 'react-native-masked-text';

import {useNavigation, useRoute} from '@react-navigation/native';
import Axios from 'axios';

const Editar = () => {

  const [img, setImg] = useState(null);
  const [titulo, setTitulo] = useState ('');
  const [categoria, setCategoria] = useState ('');
  const [descricao, setDescricao] = useState ('');
  const [preco, setPreco] = useState ('');
  const [id, setId] = useState ('');

  const navigation = useNavigation();
  const route = useRoute();
  useEffect(()=> {

    const product = route.params.product;
    setTitulo(product.titulo);
    setCategoria(product.categoria);
    setDescricao(product.descricao);
    setPreco(product.preco.toString());
    setImg(product.img);
    setId(product.id);
},[])
    
const saveProducts = () => {
    if(titulo.trim ==="") {
        alert("Titulo não pode ser vazio!")
    }else {
        Axios.patch('http://10.2.2:3000/products/' + id,{
            titulo,
            categoria,
            descricao,
            preco,
            img
        }).then((res)=>{
            alert('Salvo com sucesso!')
            navigation.navigate('Home',{res} )
        }).catch(() => alert("Erro ao salvar! "))
    } 
        
    }
    const deleteProducts = () =>{
            
        Axios.delete('http://10.2.2:3000/products/' + id).then((res)=>{
            alert('Excluído com sucesso!')
            navigation.navigate('Home',{res} )
        }).catch(() => alert("Erro ao excluir! "))
    } 
  return (
    <View style={styles.container}>
    <Text style={styles.texto}>Cadastro de Estoque</Text>

    <Image source={{uri:img ? img:null}} style={styles.imagem1}/>

    <TouchableOpacity onPress= {() => ImagePicker.showImagePicker({}, (res)=>setImg(res.uri))} >
       <Text style={styles.btn}>Selecionar Imagem</Text>
    </TouchableOpacity>

    <TextInput style={styles.input} placeholder='Titulo' value={titulo} onChangeText={(txt) => setTitulo(txt)}/>
    <TextInputMask style={styles.input} type={'money'} options={{width: true, mask:'99.999,99' }} value={preco} onChangeText={(txt) => setPreco(txt)} placeholder='Preço'/>
    <TextInput style={styles.input} placeholder='Categoria'value={categoria} onChangeText={(txt) => setCategoria(txt)}/>
    <TextInput style={styles.input} placeholder='Descrição'  value={descricao} onChangeText={(txt) => setDescricao(txt)}/>
   
    <Button 
       onPress={() => {saveProducts}} 
       title='Cadastrar'
       color='#20B2AA'
       style={{
        width: '100%',
        borderRadius: 30,
        marginVertical: 30,
        textAlign:'center'}}
      /> 
      <Button 
       onPress={() => {deleteProducts}} 
       title='Excluir'
       color='red'
       style={{
        width: '100%',
        borderRadius: 30,
        marginVertical: 30,
        textAlign:'center'}}
      />
  </View>
  )
}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    height:'100%',
    alignItems: 'center'
  },
  texto: {
   fontSize: 30,
   fontWeight:'bold',
   marginVertical:10,
   color:'#F8F8FF',
  },
  imagem1:{
   backgroundColor: '#E6E6FA',
   width: 200,
   height: 200,
   borderColor: '#4169e1',
   borderRadius: 200 / 2,
   justifyContent: 'flex-start'
  },
  input: {
    backgroundColor: '#E6E6FA',
    color:'gray',
    borderRadius: 20,
    keyboardType:'numeric',
    marginVertical:10,
    textAlign:'center',
    width: '90%',
    border: 1
  },
  btn: {
    color:'#4169E1',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign:'center',
  }
})

export default Editar;