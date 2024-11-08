import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataPMA = create(
    persist(
        (set, get) => ({
            dataPMA: [],
            setDataPMA: (dataFetch) => set({ dataPMA: dataFetch }),
        }),
        {
            name: 'dataPMA', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)