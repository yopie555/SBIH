import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataJumlahRumahTidakLayakHuni = create(
    persist(
        (set, get) => ({
            dataJumlahRumahTidakLayakHuni: [],
            setDataJumlahRumahTidakLayakHuni: (dataFetch) => set({ dataJumlahRumahTidakLayakHuni: dataFetch }),
        }),
        {
            name: 'dataJumlahRumahTidakLayakHuni', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)