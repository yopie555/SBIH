import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataProduksiPerikananTangkap = create(
    persist(
        (set, get) => ({
            dataProduksiPerikananTangkap: [],
            setDataProduksiPerikananTangkap: (dataFetch) => set({ dataProduksiPerikananTangkap: dataFetch }),
        }),
        {
            name: 'dataProduksiPerikananTangkap', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)