import { ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import client from '../sanity'

const Categories = () => {
  const [categories, setCategories] = useState([])
  useEffect(()=> {
    client.fetch(`
      *[_type == "category"]
    `).then((data)=> setCategories(data))
  },[])
  return (
    <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, paddingTop: 10, paddingBottom: 10}}
        horizontal
        showsHorizontalScrollIndicator={false}
    >
      {categories.map((item)=> (
        <CategoryCard 
          key={item._id}
          imgURL={item.image} 
          title={item.title}
        />
      ))}
    </ScrollView>
  )
}

export default Categories