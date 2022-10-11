import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, selectBasketItemsWithId } from '../features/basketSlice'
import CurrencyFormat from 'react-currency-format';

const DishRow = ({id, name, desc, price, image}) => {
    const [isPress, setIsPress] = useState(false);
    const items = useSelector((state)=>selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();
    const handleAddPress = () => {
        dispatch(increment({ id, name, desc, price, image }));
    }
    const handleDelAndPress = () => {
        if(!items.length > 0) return;
        dispatch(decrement({id}))
    }
  return (
    <TouchableOpacity
      onPress={() => setIsPress(!isPress)}
      className={`bg-white p-4 border-gray-200 ${isPress && "border-b-0"}`}
    >
      <View className="flex-row items-center pb-4">
        <View className="flex-1 pr-2">
          <Text className="text-lg mb-1 font-semibold">{name}</Text>
          <Text className="text-gray-400">{desc}</Text>
          <CurrencyFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Rp."}
            renderText={(value) => (
              <Text className="text-gray-700 mt-2 text-lg">{value}</Text>
            )}
          />
        </View>
        <View>
          <Image
            source={{ uri: urlFor(image).url() }}
            className="w-20 h-20 p-4 bg-white"
          />
        </View>
      </View>
      {isPress && (
        <View className="flex-row items-center space-x-2 pb-3">
          <TouchableOpacity
            disabled={!items.length}
            onPress={handleDelAndPress}
          >
            <MinusCircleIcon color={items.length > 0 ? "red" : "gray"} />
          </TouchableOpacity>
          <Text>{items.length}</Text>
          <TouchableOpacity onPress={handleAddPress}>
            <PlusCircleIcon color="red" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default DishRow