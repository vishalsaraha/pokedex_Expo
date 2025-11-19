import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/"

interface pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: pokemonType[];
}

interface pokemonType {
  type: {
    name: string;
    url: string;

  }
 
}

 const colorsByType: Record<string, string> ={
  // Common/Standard Types
  normal: "#A8A878", // Light Brown/Grey
  fire: "#F08030",   // Orange/Red
  water: "#6890F0",  // Blue
  grass: "#78C850",  // Green
  electric: "#F8D030", // Yellow
  ice: "#98D8D8",    // Cyan/Light Blue
  fighting: "#C03028", // Dark Red
  poison: "#A040A0",  // Purple
  ground: "#E0C068",  // Tan/Sand
  flying: "#A890F0",  // Lavender
  psychic: "#F85888", // Pink
  bug: "#A8B820",    // Olive Green
  rock: "#B8A038",    // Gold/Dark Yellow
  ghost: "#705898",   // Dark Purple/Indigo
  dragon: "#7038F8",  // Royal Purple/Blue

  // Special/Newer Types
  steel: "#B8B8D0",   // Metallic Grey
  dark: "#705848",    // Dark Brown/Black
  fairy: "#EE99AC",   // Light Pink/Fuchsia
};

export default function Index() {
  const[pokemons, setPokemons] = useState<pokemon[]>([]);
  // console.log(JSON.stringify(pokemons[0]), null, 2);

  useEffect(() => {
    //fetch pokemons
    fetchpokemons()
  }, [])

  async function fetchpokemons() {
    try{
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=30");
      const data = await response.json();
      // fetching more details about the pokemon

      const detailedpokemons = await Promise.all(
        data.results.map(async(pokemon:any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return{
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,   
          };

        })

      );
      
      setPokemons( detailedpokemons);

    } catch(e) {
      console.log(e);
    }
  }

  return (
    <ScrollView contentContainerStyle={{
      gap: 16,
      padding: 16,
    }}>
      {
        pokemons.map((pokemon) => (
      <Link key={pokemon.name}
          href={{ pathname: "/details", params: {name: pokemon.name }}}
      >
          <View style={{
            //@ts-ignore
            backgroundColor: colorsByType[pokemon.types[0].type.name] +50,
            padding: 20,
            borderRadius: 20,
          }}>
            <Text style={styles.name}>
              {pokemon.name}
            </Text>
            <Text style={styles.type}>
              {pokemon.types[0].type.name}
            </Text>
            {/* <Text>
              {pokemon.image}
            </Text> */}
            <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            >
            <Image 
            source={{uri: pokemon.image}}
            style={{width:150, height:150}}
            
            />
            <Image 
            source={{uri: pokemon.imageBack}}
            style={{width:150, height:150}}
            
            />
            </View>
            
          </View>
          </Link>

        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center",
  },
  type: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'grey',
      textAlign: "center",
  }
})