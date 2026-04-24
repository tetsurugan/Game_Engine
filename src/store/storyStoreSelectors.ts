import { useStoryStore } from "./useStoryStore";

export type StoryStoreSnapshot = ReturnType<typeof useStoryStore.getState>;

export const selectProfile = (s: StoryStoreSnapshot) => s.profile;
export const selectStartStory = (s: StoryStoreSnapshot) => s.startStory;
export const selectContinueStory = (s: StoryStoreSnapshot) => s.continueStory;
export const selectClearAll = (s: StoryStoreSnapshot) => s.clearAll;
