import { useEffect } from "react";
import { ScrollView } from "react-native";

export default function Index() {

  useEffect(() => {
    //fetch pokemons
    fetchpokemons()
  }, [])

  async function fetchpokemons() {
    try{
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
      const data = await response.json();
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <ScrollView>
      
    </ScrollView>
  );
}
