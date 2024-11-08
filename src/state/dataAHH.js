import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataAngkaHarapanHidup = create(
    persist(
        (set, get) => ({
            dataAngkaHarapanHidup: [],
            setDataAngkaHarapanHidup: (dataFetch) => set({ dataAngkaHarapanHidup: dataFetch }),
        }),
        {
            name: 'dataAngkaHarapanHidup', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)