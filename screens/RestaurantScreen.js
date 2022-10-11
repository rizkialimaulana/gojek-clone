import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import AndroidView from '../AndroidView'
import { urlFor } from '../sanity'
import { ArrowLeftIcon, StarIcon, MapPinIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import DishRow from '../components/DishRow'
import Chart from '../components/Chart'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/RestaurantSlice'

const RestaurantScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {
      params: {
        id,
        imgURL,
        title,
        rating,
        genre,
        address,
        short_desc,
        dishes,
        long,
        lat,
      },
    } = useRoute();

    useEffect(()=> {
      dispatch(
        setRestaurant({
          id,
          imgURL,
          title,
          rating,
          genre,
          address,
          short_desc,
          dishes,
          long,
          lat,
        })
      );
    },[])
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerShown: false 
        })
    },[])
  return (
    <>
      <SafeAreaView style={AndroidView.AndroidSafeArea}>
        <ScrollView>
          <View className="relative">
            <Image
              source={{ uri: urlFor(imgURL).url() }}
              className="w-full h-56 bg-gray-400 p-4"
            />
            <TouchableOpacity
              onPress={navigation.goBack}
              className="rounded-full p-3 text-red-700 bg-white absolute top-2 left-2"
            >
              <ArrowLeftIcon size={20} color="red" />
            </TouchableOpacity>
          </View>
          <View className="px-2 pt-2">
            <Text className="font-bold text-2xl">{title}</Text>
            <View className="pt-2 flex-row items-center space-x-1">
              <StarIcon size={20} color="red" />
              <Text>{rating}</Text>
              <MapPinIcon size={22} color="red" />
              <Text>{address}</Text>
            </View>
            <Text className="mt-2 pb-4 text-gray-500">{short_desc}</Text>
            <TouchableOpacity className="flex-row items-center justify-between pt-3 pb-3 border-y border-gray-300">
              <View className="space-x-1 flex-row items-center">
                <QuestionMarkCircleIcon color="gray" opacity={0.5} />
                <Text className="font-bold">Have a food allergy?</Text>
              </View>
              <ChevronRightIcon color="red" />
            </TouchableOpacity>
            <View className="pb-32">
              <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
              {dishes?.map((dish) => (
                <DishRow
                  key={dish._id}
                  id={dish._id}
                  name={dish.name}
                  desc={dish.desc}
                  price={dish.price}
                  image={dish.image}
                />
              ))}
            </View>
          </View>
        </ScrollView>
        <Chart />
      </SafeAreaView>
    </>
  );
}
export default RestaurantScreen