import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataAtasDasarHargaKonstan = create(
    persist(
        (set, get) => ({
            dataAtasDasarHargaKonstan: [],
            setDataAtasDasarHargaKonstan: (dataFetch) => set({ dataAtasDasarHargaKonstan: dataFetch }),
        }),
        {
            name: 'dataAtasDasarHargaKonstan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)