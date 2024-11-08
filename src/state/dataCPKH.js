import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataCapaianProduksiKomoditiHortikultura = create(
    persist(
        (set, get) => ({
            dataCapaianProduksiKomoditiHortikultura: [],
            setDataCapaianProduksiKomoditiHortikultura: (dataFetch) => set({ dataCapaianProduksiKomoditiHortikultura: dataFetch }),
        }),
        {
            name: 'dataCapaianProduksiKomoditiHortikultura', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)