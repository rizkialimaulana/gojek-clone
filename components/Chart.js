import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import CurrencyFormat from 'react-currency-format';
const Chart = () => {
    const items = useSelector(selectBasketItems)
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal)

    if(items.lenght === 0) return null;
  return (
    <View className="absolute bottom-10 z-50 w-full">
      <TouchableOpacity 
        onPress={() => navigation.navigate("Checkout")}
        className="bg-red-700 mx-5 p-4 rounded-lg flex-row items-center space-x-1">
        <Text className="text-white font-bold text-lg bg-red-500 px-2 py-1">
          {items.length}
        </Text>
        <Text className="text-center text-white flex-1">TOTAL</Text>
        <CurrencyFormat
          value={basketTotal}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp."}
          renderText={(value) => (
            <Text className="text-white font-bold text-lg">{value}</Text>
          )}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Chart