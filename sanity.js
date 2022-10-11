import SanityClientConstructor from "@sanity/client";
import ImageUrlBuilder from '@sanity/image-url';

const client = SanityClientConstructor({
  projectId: "lixmzi5b",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21"
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client