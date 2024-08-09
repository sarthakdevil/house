import Housecard from "@/components/housecard";
import OffButton from "@/components/Off";
import { StyleSheet, Text, View } from "react-native";
export default function Index() {
  return (
    
    <View
      style={Styles.container}
    >
      <Housecard/>
    </View>
    
  );
}
const Styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
