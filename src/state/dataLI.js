import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataLajuInflasi = create(
    persist(
        (set, get) => ({
            dataLajuInflasi: [],
            setDataLajuInflasi: (dataFetch) => set({ dataLajuInflasi: dataFetch }),
        }),
        {
            name: 'dataLajuInflasi', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)