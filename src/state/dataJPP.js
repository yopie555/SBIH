import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataJumlahProduksiPeternakan = create(
    persist(
        (set, get) => ({
            dataJumlahProduksiPeternakan: [],
            setDataJumlahProduksiPeternakan: (dataFetch) => set({ dataJumlahProduksiPeternakan: dataFetch }),
        }),
        {
            name: 'dataJumlahProduksiPeternakan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)