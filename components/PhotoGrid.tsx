import { Dimensions, FlatList, Image } from "react-native";

import { formatPhotoUri } from "../api/picsum";
import { IPhoto } from "../reducers/photos";

export default function PhotoGrid({
  photos,
  numColumns,
  onEndReached,
}: {
  photos: IPhoto[];
  numColumns: number;
  onEndReached: any;
}) {
  //using the Dimensions API to determine the width of the screen, and divide the result by numColumns to know what size of image to display.
  const { width } = Dimensions.get("window");
  const size = width / numColumns;

  // ...
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <Image
          source={{
            width: size,
            height: size,
            uri: formatPhotoUri(item.id, size, size),
          }}
        />
      )}
    />
  );
}
