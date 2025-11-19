import { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";

export default function Index() {
  const[pokemons, setPokemons] = useState([]);

  useEffect(() => {
    //fetch pokemons
    fetchpokemons()
  }, [])

  async function fetchpokemons() {
    try{
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
      const data = await response.json();
      setPokemons(data.results);

    } catch(e) {
      console.log(e);
    }
  }

  return (
    <ScrollView>
      {
        pokemons.map((pokemon) => (

          <View key={pokemon.name}>
            <Text>
              {pokemon.name}
            </Text>
          </View>

        ))}
    </ScrollView>
  );
}
