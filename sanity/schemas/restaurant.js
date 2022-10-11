export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule)=> Rule.required() 
    },
    {
      name: 'desc',
      title: 'Short Description',
      type: 'string',
      validation: (Rule)=> Rule.required() 
    },
    {
      name: 'image',
      title: 'Restaurant Image',
      type: 'image',
    },
    {
      name: 'lat',
      title: 'Latitude of the Restaurant',
      type: 'number',
    },
    {
      name: 'long',
      title: 'Longitude of the Restaurant',
      type: 'number',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule)=> Rule.required() 
    },
    {
      name: 'rating',
      title: 'Give Rating',
      type: 'number',
      validation: (Rule)=> Rule.required()
        .min(1)
        .max(5)
        .error("Please give rating between 1 and 5")
    },
    {
      name: 'type',
      title: 'Category',
      type: 'reference',
      validation: (Rule)=> Rule.required(),
      to: [{type: 'category'}]
    },
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{
            type: 'dish'
          }]
        }
      ]
    },
  ],
}
