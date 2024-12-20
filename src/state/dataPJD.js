import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataPanjangJalanDibangun = create(
    persist(
        (set, get) => ({
            dataPanjangJalanDibangun: [],
            setDataPanjangJalanDibangun: (dataFetch) => set({ dataPanjangJalanDibangun: dataFetch }),
        }),
        {
            name: 'dataPanjangJalanDibangun', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)