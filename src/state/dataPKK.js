import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataPerkembanganKondisiKetenagakerjaan = create(
    persist(
        (set, get) => ({
            dataPerkembanganKondisiKetenagakerjaan: [],
            setDataPerkembanganKondisiKetenagakerjaan: (dataFetch) => set({ dataPerkembanganKondisiKetenagakerjaan: dataFetch }),
        }),
        {
            name: 'dataPerkembanganKondisiKetenagakerjaan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)