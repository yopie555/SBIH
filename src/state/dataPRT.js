import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataPenggunaanAirBersih = create(
    persist(
        (set, get) => ({
            dataPenggunaanAirBersih: [],
            setDataPenggunaanAirBersih: (dataFetch) => set({ dataPenggunaanAirBersih: dataFetch }),
        }),
        {
            name: 'dataPenggunaanAirBersih', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)