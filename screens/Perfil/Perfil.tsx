import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";




export default function Perfil() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
       <View style={styles.header}>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <MaterialIcons name="arrow-back" size={24} color="white" />
  </TouchableOpacity>
        <Image
          source={require('../../assets/pessoa.png')} // Imagem local
          style={styles.avatar}
        />
        <Text style={styles.name}>Erick Abraão Santos</Text>
      </View>

      {/* Status */}
      <View style={styles.statusBox}>
        <View style={styles.statusRow}>
          <MaterialIcons name="check-circle" size={20} color="green" />
          <Text style={styles.statusText}>
            Disponível - Disponível o dia todo{"\n"}Horário: 12:00 - 8:00
          </Text>
        </View>
        <View style={styles.statusRow}>
          <MaterialIcons name="access-time" size={20} color="gray" />
          <Text style={styles.statusText}>11:03 - Seu horário local</Text>
        </View>
      </View>

      {/* Contato */}
      <View style={styles.contactBox}>
        <Text style={styles.contactTitle}>Contato</Text>
        <View style={styles.contactRow}>
          <MaterialIcons name="email" size={24} color="black" />
          <Text style={styles.emailText}>erick01924@gmail.com</Text>
        </View>
      </View>      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#003366",
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
  },
  avatar: {
  width: 80,
  height: 80,
  borderRadius: 40,
  marginBottom: 10,
  borderWidth: 2,
  borderColor: 'white',
},
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusBox: {
    backgroundColor: "#e0e0e0",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#d3d3d3",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  statusText: {
    marginLeft: 10,
    fontSize: 14,
    flexShrink: 1,
  },
  contactBox: {
    marginTop: 40,
    alignItems: "center",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  emailText: {
    marginLeft: 8,
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#003366",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  backButton: {
  position: 'absolute',
  top: 45,
  left: 20,
  padding: 5,
},

});
