import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataIPM = create(
    persist(
        (set, get) => ({
            dataIPM: [],
            setDataIPM: (dataFetch) => set({ dataIPM: dataFetch }),
        }),
        {
            name: 'dataIPM', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)