import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataCapaianProduksiKomoditiUnggulanPerkebunan = create(
    persist(
        (set, get) => ({
            dataCapaianProduksiKomoditiUnggulanPerkebunan: [],
            setDataCapaianProduksiKomoditiUnggulanPerkebunan: (dataFetch) => set({ dataCapaianProduksiKomoditiUnggulanPerkebunan: dataFetch }),
        }),
        {
            name: 'dataCapaianProduksiKomoditiUnggulanPerkebunan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)