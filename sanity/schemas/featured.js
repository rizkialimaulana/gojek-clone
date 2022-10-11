export default {
  name: "featured",
  title: "Featured Menu Categories",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      vaidation: (Rule)=> Rule.required()
    },
    {
      name: "desc",
      title: "Short Description",
      type: "string",
      vaidation: (Rule)=> Rule.required()
    },
    {
      name: "restaurants",
      title: "Restaurants",
      type: "array",
      of : [
        {
            type: 'reference',
            to: [
                {type: 'restaurant'}
            ]
        }
      ]
    },
  ],
};
