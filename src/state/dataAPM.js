import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataAngkaPartisipasiMurni = create(
    persist(
        (set, get) => ({
            dataAngkaPartisipasiMurni: [],
            setDataAngkaPartisipasiMurni: (dataFetch) => set({ dataAngkaPartisipasiMurni: dataFetch }),
        }),
        {
            name: 'dataAngkaPartisipasiMurni', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)