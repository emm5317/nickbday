import { FlatList, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Spacing } from '@/constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAP = 2;
const COLUMNS = 3;
const CELL_SIZE = (SCREEN_WIDTH - GAP * (COLUMNS - 1)) / COLUMNS;

interface PhotoGridProps {
  photoUris: string[];
  onPhotoPress: (uri: string) => void;
}

export function PhotoGrid({ photoUris, onPhotoPress }: PhotoGridProps) {
  return (
    <FlatList
      data={photoUris}
      numColumns={COLUMNS}
      keyExtractor={(item, index) => `${item}-${index}`}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPhotoPress(item)}
          style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
        >
          <Image source={{ uri: item }} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingBottom: Spacing.xxl + 60,
  },
  row: {
    gap: GAP,
    marginBottom: GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
