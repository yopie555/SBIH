import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataIndeksPemberdayaanGender = create(
    persist(
        (set, get) => ({
            dataIndeksPemberdayaanGender: [],
            setDataIndeksPemberdayaanGender: (dataFetch) => set({ dataIndeksPemberdayaanGender: dataFetch }),
        }),
        {
            name: 'dataIndeksPemberdayaanGender', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)