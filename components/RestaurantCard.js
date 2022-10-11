import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({id,
                imgURL,
                title,
                rating,
                genre,
                address,
                short_desc,
                dishes,
                long,
                lat}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity className="bg-white mr-3 shadow" onPress={() => navigation.navigate('Restaurant', {
      id, imgURL, title, rating, genre,address, short_desc, dishes, long, lat
    })}>
      <Image source={{ uri: urlFor(imgURL).url() }} className="w-full h-36 rounded-sm" />
      <View className="px-1 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-600">{rating}</Text> - {genre}
          </Text>
        </View>
        <View className="flex-row items-center pt-1 space-x-1">
          <MapPinIcon size={22} color="red" opacity={0.4}/>
          <Text className="text-xs text-gray-500">Nearby - {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default RestaurantCard