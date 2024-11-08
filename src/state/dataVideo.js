import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataVideo = create(
    persist(
        (set, get) => ({
            dataVideo: [],
            setDataVideo: (dataFetch) => set({ dataVideo: dataFetch }),
        }),
        {
            name: 'dataVideo', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)