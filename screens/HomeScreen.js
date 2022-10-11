import { Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import driver from '../assets/img/driver.png';
import AndroidView from '../AndroidView';
import { ChevronDownIcon, UserIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featured, setFeatured] = useState([])

  useLayoutEffect(()=> {
    navigation.setOptions({
      headerShown: false,
    })
  },[])

  useEffect(()=>{
    client.fetch(`
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }}`).then((data) => {
        setFeatured(data)
      });
  },[])
  return (
    <SafeAreaView style={AndroidView.AndroidSafeArea} className="bg-white">
        <View className="flex-row pb-3 space-x-2 items-center mx-4">
          <Image source={driver} className="h-7 w-7 p-4" />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver</Text>
            <Text className="font-bold text-xl">
              Lokasimu
              <ChevronDownIcon size={20} color="red" />
            </Text>
          </View>
          <UserIcon size={35} color="black" />
        </View>
        <View className="flex-row space-x-2 items-center px-2 pb-2 mx-4">
          <View className='flex-row space-x-2 p-3 flex-1 bg-gray-200'>
            <MagnifyingGlassIcon color="red"/>
            <TextInput placeholder='Mau makan apa sekarang?' keyboardType='default'/>
          </View>
          <AdjustmentsVerticalIcon color="red" />
        </View>
        <ScrollView 
          className="bg-gray-200"
        >
          <Categories />
          {featured?.map((category)=> (
            <FeaturedRow 
              key={category._id}
              id={category._id}
              title={category.title}
              desc={category.desc}
            />
          ))}
        </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen