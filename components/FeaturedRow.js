import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import client from '../sanity';

const FeaturedRow = ({id, title, desc}) => {
    const [restaurant, setRestaurant] = useState([]);
    useEffect(()=> {
        client
          .fetch(
            `
            *[_type == "featured" && _id == $id] {
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->,
                    type->{
                        name
                    }
                }}[0]
        `,{id}
          )
          .then((data) => setRestaurant(data?.restaurants));
    },[])
  return (
    <View className="bg-white">
        <View className='pt-4 flex-row items-center px-4 justify-between'>
            <Text className='font-bold text-lg'>{title}</Text>
            <ArrowRightIcon color='red'/>
        </View>
        <Text className='px-4 text-xs text-gray-500'>{desc}</Text>

        <ScrollView
            horizontal
            contentContainerStyle={{
                paddingHorizontal: 15
            }}
            showsHorizontalScrollIndicator={false}
            className='pt-4'
        >
            {restaurant.map((store)=>(
                <RestaurantCard 
                    key={store._id}
                    id={store._id}
                    imgURL={store.image}
                    title={store.name}
                    rating={store.rating}
                    genre={store.type?.name}
                    address={store.address}
                    short_desc={store.desc}
                    dishes={store.dishes}
                    long={store.long}
                    lat={store.lat}
                />
            ))}
        </ScrollView>
    </View>
  )
}

export default FeaturedRow