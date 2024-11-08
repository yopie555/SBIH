import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataAngkaKematianIbuMelahirkan = create(
    persist(
        (set, get) => ({
            dataAngkaKematianIbuMelahirkan: [],
            setDataAngkaKematianIbuMelahirkan: (dataFetch) => set({ dataAngkaKematianIbuMelahirkan: dataFetch }),
        }),
        {
            name: 'dataAngkaKematianIbuMelahirkan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)