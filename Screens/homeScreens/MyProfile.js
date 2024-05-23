import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
//import storage from '@react-native-firebase/storage';
import firebase from "../../Config";
import { get, set } from "firebase/database";
const database = firebase.database();

export default function MyProfile(props) {
  const currentid = props.route.params.currentid;

  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Pseudo, setPseudo] = useState("");
  const [urlImage, setUrlImage] = useState(null);
  const [Connected, setConnected] = useState("");


  const existProfile = async () =>{

    const p = database.ref("listProfile")
    try {
      const snapshot = await get(p)
      if (snapshot.exists()) {
        const ps = Object.values(snapshot.val()).find(x=>x.idProfile == currentid)
        setNom(ps.Nom)
        setPrenom(ps.Prenom)
        setTelephone(ps.Telephone)
        setPseudo(ps.Pseudo)
        setConnected(ps.Connected)
      }
    } catch (error) {
      console.log(error)
    }

  }
  existProfile()
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });


    if (!result.canceled) {
      setUrlImage(result.assets[0].uri);
    }
  };
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob"; //bufferArray
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    return blob;
  };
  const uploadLocalToStorage = async (url) =>{
   const storage = firebase.storage();
    const ref_photos_des_profils = storage.ref("photos_des_profils");
    const ref_unphoto = ref_photos_des_profils.child(currentid);
    const blob = await imageToBlob(url);
    await ref_unphoto.put(blob);
    const lien = await ref_unphoto.getDownloadURL();
    return lien;
  }
  return (
    <ImageBackground
      source={require("../../assets/pngtre.png")}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <Text style={styles.textstyle}>Mon compte</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            urlImage ? { uri: urlImage } : require("../../assets/profil.png")
          }
          style={{
            height: 150,
            width: 150,
          }}
        ></Image>
      </TouchableOpacity>

      <TextInput
        onChangeText={(text) => {
          setNom(text);
        }}
        textAlign="center"
        placeholderTextColor="#0005"
        placeholder="Nom"
        keyboardType="name-phone-pad"
        value={Nom}
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPrenom(text);
        }}
        textAlign="center"
        placeholderTextColor="#0005"
        placeholder="Prenom"
        keyboardType="name-phone-pad"
        value={Prenom}
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setTelephone(text);
        }}
        placeholderTextColor="#0005"
        textAlign="center"
        placeholder="Telephone"
        keyboardType="phone-pad"
        value={Telephone}
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPseudo(text);
        }}
        placeholderTextColor="#0005"
        textAlign="center"
        placeholder="Pseudo"
        value={Pseudo}
        style={styles.textinputstyle}
      ></TextInput>

      <TouchableOpacity
        onPress={async () => {
          //if (urlImage && Nom.length >0){
           // const link = await uploadLocalToStorage(urlImage)
            const refProfiles = database.ref("listProfile")
            const key = currentid
            const unProfile = refProfiles.child("unProfile" + key)
            unProfile.set({
              idProfile: currentid,
              Nom,
              Prenom,
              Telephone,
              Pseudo,
              url: null,
              Connected: true
            }).then(() => {
              alert("Profile saved")
            }).catch((error) => {
              alert(error)
            })
          //}
        }}
        disabled={false}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        style={{
          marginBottom: 10,
          backgroundColor: "#4682a0",
          textstyle: "italic",
          fontSize: 24,
          height: 40,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          firebase.auth().signOut();
          const refe = database.ref('listProfile');
          try {
            const snapshot = await refe.get()
            if(snapshot.exists()){
              const existingContactKey = Object.keys(snapshot.val())[0];
              const existingContactRef = database.ref(`listProfile/${existingContactKey}`);
              set(existingContactRef,{
                Connected: false
              })
              props.navigation.navigate("Authentification");
            }
          } catch (error) {
            console.log(error)
          }
        }}
        disabled={false}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        style={{
          marginBottom: 10,
          backgroundColor: "#4682a0",
          textstyle: "italic",
          fontSize: 24,
          height: 40,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textinputstyle: {
    fontStyle: "italic",
    backgroundColor: "#0002",
    fontSize: 13,
    width: "70%",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  textstyle: {
    fontSize: 32,
    fontFamily: "serif",
    color: "#4682b4",
    fontWeight: "bold",
  },
  container: {
    paddingTop: 40,
    color: "blue",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

