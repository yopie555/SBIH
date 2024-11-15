import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataAnggaran = create(
    persist(
        (set, get) => ({
            dataAnggaran: [],
            setDataAnggaran: (dataFetch) => set({ dataAnggaran: dataFetch }),
        }),
        {
            name: 'dataAnggaran', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)