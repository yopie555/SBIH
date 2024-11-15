import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataTahun = create(
    persist(
        (set, get) => ({
            dataTahun: [],
            setDataTahuns: (dataFetch) => set({ dataTahun: dataFetch }),
        }),
        {
            name: 'dataTahun', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)