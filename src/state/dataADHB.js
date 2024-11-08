import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataAtasDasarHargaBerlaku = create(
    persist(
        (set, get) => ({
            dataAtasDasarHargaBerlaku: [],
            setDataAtasDasarHargaBerlaku: (dataFetch) => set({ dataAtasDasarHargaBerlaku: dataFetch }),
        }),
        {
            name: 'dataAtasDasarHargaBerlaku', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)