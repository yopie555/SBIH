import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataProduksiPerikananBudidaya = create(
    persist(
        (set, get) => ({
            dataProduksiPerikananBudidaya: [],
            setDataProduksiPerikananBudidaya: (dataFetch) => set({ dataProduksiPerikananBudidaya: dataFetch }),
        }),
        {
            name: 'dataProduksiPerikananBudidaya', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)