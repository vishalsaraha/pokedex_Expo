import { Stack } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";


export default function Details() {

  const params = useLocalSearchParams()

  console.log(params.name);
 
  return (
    <>
    <Stack.Screen options={{title: "Test"}}/>
    <ScrollView contentContainerStyle={{
      gap: 16,
      padding: 16,
    }}>
      
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({ })