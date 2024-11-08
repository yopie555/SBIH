import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataIndeksDayaBeli = create(
    persist(
        (set, get) => ({
            dataIndeksDayaBeli: [],
            setDataIndeksDayaBeli: (dataFetch) => set({ dataIndeksDayaBeli: dataFetch }),
        }),
        {
            name: 'dataIndeksDayaBeli', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)