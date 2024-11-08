import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataIndeksPembangunanGender = create(
    persist(
        (set, get) => ({
            dataIndeksPembangunanGender: [],
            setDataIndeksPembangunanGender: (dataFetch) => set({ dataIndeksPembangunanGender: dataFetch }),
        }),
        {
            name: 'dataIndeksPembangunanGender', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)