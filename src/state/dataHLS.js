import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataAngkaHarapanLamaSekolah = create(
    persist(
        (set, get) => ({
            dataAngkaHarapanLamaSekolah: [],
            setDataAngkaHarapanLamaSekolah: (dataFetch) => set({ dataAngkaHarapanLamaSekolah: dataFetch }),
        }),
        {
            name: 'dataAngkaHarapanLamaSekolah', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)