export default {
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "desc",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
  ],
};
