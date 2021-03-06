import React, {useState} from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity, 
    Image, ScrollView, TextInput, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIo from 'react-native-vector-icons/Ionicons';
import ImgToBase64 from 'react-native-image-base64';

import ImagesApi from "../services/ImagesApi";
import Theme from "../constants/Theme";

const EditCardOptions = (props) => {
    const {onAddLinePress, onImageSelection} = props;

    const [modalVisible, setModalVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(0);
    const [searchTxt, setSearchTxt] = useState("");
    const [loading, setLoading] = useState(false);

    async function loadImages(text){
        if(!text) return;
        try{
            setLoading(true);
            const imgs = await ImagesApi.searchImages(text);
            setImages(imgs.hits);
            setLoading(false);
        }catch(err){
            setLoading(false);
            console.log(err);
            alert('Failed to load images');
        }
    }

    async function handleImageSelection(){
        if(onImageSelection && images.length > 0){
            const base64 = await ImgToBase64.getBase64String(images[selectedImg].webformatURL);
            onImageSelection('data:image/png;base64,' +base64);
        }
        setModalVisible(!modalVisible);
    }

    return (
        <View style={styles.buttons}>
            <Icon style={styles.icons} name="image-search-outline" onPress={()=>setModalVisible(true)} size={25}/>
            <Icon name="expand-all-outline" onPress={onAddLinePress} size={25}/>

            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.searchView}>
                            <TextInput
                                style={styles.searchBar} 
                                placeholder="Search Image"
                                onChangeText={text => setSearchTxt(text)}
                                onSubmitEditing={()=> loadImages(searchTxt)}
                                />
                            <IconIo name="md-search" color="#555" size={30} onPress={()=> loadImages(searchTxt)} />
                        </View>
                        <View style={styles.content}>
                            <ScrollView style={{width: '100%'}}>
                                {loading ? <ActivityIndicator animating={loading} size="large" color="#0000ff" /> : null}
                                <View style={styles.imageView}>
                                {images.map((image, index)=>(
                                    <TouchableOpacity 
                                        style={index === selectedImg ? styles.selectedImg: styles.notSelect} 
                                        key={index} 
                                        onPress={()=> setSelectedImg(index)}
                                        >
                                        <Image style={styles.images} source={{uri:image.webformatURL}}/>
                                    </TouchableOpacity>
                                ))}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                                <Icon name="close-circle-outline" size={30} color="#a00"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleImageSelection}>
                                <IconIo name="md-checkmark-circle-outline" size={30} color="#0a0"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    buttons:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    icons:{
        marginHorizontal: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
    modalView: {
        width: '95%',
        height: '90%',
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 1,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    searchView:{
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar:{
        width: '80%',
        textAlign: 'center',
    },
    content:{
        flex: 6,
        width: '100%'
    },
    footer:{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageView:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    images:{ 
        height: 100,
        width: '100%',
        borderWidth: 1
    },
    selectedImg:{
        width: '33%',
        borderWidth: 2,
        borderColor: Theme.secondary,
    },
    notSelect:{
        width: '33%',
        borderWidth: 2,
        borderColor: '#000',
    }
});

export default EditCardOptions;