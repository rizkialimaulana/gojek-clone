import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AndroidView from '../AndroidView';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/RestaurantSlice';
import { decrement, increment, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { PlusCircleIcon, XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from "../sanity";
import CurrencyFormat from 'react-currency-format';

const CheckoutScreen = () => {
    const [groupedItem, setGroupedItem] = useState([])
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const subtotal = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems)
    const dispatch = useDispatch()

    useEffect(() => {
        const itemGroup = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item)
            return results;
        }, {})

        setGroupedItem(itemGroup)
    }, [items])

    console.log(groupedItem)
  return (
    <SafeAreaView
      style={AndroidView.AndroidSafeArea}
      className="flex-1 bg-white"
    >
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-red-200 bg-white shadow-xs">
          <View className="relative">
            <Text className="text-lg font-bold text-center mb-2">Checkout</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
            <TouchableOpacity
              onPress={navigation.goBack}
              className="absolute top-0 right-5"
            >
              <XCircleIcon size={20} color="red" height={50} width={50} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image className="w-7 h-7 rounded-full bg-gray-300 p-4" />
          <Text className="flex-1">Dikirim dalam 30-40 menit</Text>
          <TouchableOpacity>
            <Text className="text-red-800">Ganti</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="devide-y devide-gray-200">
          {Object.entries(groupedItem).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <TouchableOpacity>
                <PlusCircleIcon
                  color="red"
                  width={20}
                  height={20}
                  onPress={() => dispatch(increment({ id: key }))}
                />
              </TouchableOpacity>
              <Text>{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <CurrencyFormat
                value={items[0]?.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp."}
                renderText={(value) => <Text>{value}</Text>}
              />
              <TouchableOpacity>
                <Text
                  className="text-red-700"
                  onPress={() => dispatch(decrement({ id: key }))}
                >
                  Hapus
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4 bottom-10 mx-5 rounded-lg">
          <View className="flex-row justify-between">
            <Text className="font-semibold text-gray-600">Subtotal</Text>
            <CurrencyFormat
              value={subtotal}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp."}
              renderText={(value) => (
                <Text className="text-red-600 font-semibold">{value}</Text>
              )}
            />
          </View>
          <View className="flex-row justify-between">
            <Text className="font-semibold text-gray-600">Ongkos Kirim</Text>
            <CurrencyFormat
              value={15000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp."}
              renderText={(value) => (
                <Text className="text-red-600 font-semibold">{value}</Text>
              )}
            />
          </View>
          <View className="flex-row justify-between">
            <Text className="font-bold text-lg">Total</Text>
            <CurrencyFormat
              value={subtotal + 15000}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp."}
              renderText={(value) => (
                <Text className="text-red-700 font-bold text-lg">{value}</Text>
              )}
            />
          </View>
          <TouchableOpacity className=" py-3 bg-red-700">
            <Text className="text-center text-white text-xl">Bayar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default CheckoutScreen