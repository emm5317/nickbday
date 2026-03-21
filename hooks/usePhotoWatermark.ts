// Watermark hook — uses react-native-view-shot to capture a View
// containing the photo + gold text overlay, then saves to media library.
// Implementation will be completed in the Memories module build phase.

export function usePhotoWatermark() {
  // TODO: Implement ViewShot-based watermark pipeline
  return {
    applyWatermark: async (_photoUri: string): Promise<string> => {
      // Placeholder: returns original URI until watermark pipeline is built
      return _photoUri;
    },
  };
}
