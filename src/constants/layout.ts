import { Dimensions } from 'react-native';

export const LAYOUT = {
  CARD_MARGIN: 8,
  NUM_COLUMNS: 2,
  CARD_WIDTH: (Dimensions.get('window').width - 8 * (2 * 2) - 16) / 2,
  PADDING: 16,
};