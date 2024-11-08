import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataAngkaMelekHuruf = create(
    persist(
        (set, get) => ({
            dataAngkaMelekHuruf: [],
            setDataAngkaMelekHuruf: (dataFetch) => set({ dataAngkaMelekHuruf: dataFetch }),
        }),
        {
            name: 'dataAngkaMelekHuruf', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)