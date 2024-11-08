import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataPersentaseTingkatKemantapanJalan = create(
    persist(
        (set, get) => ({
            dataPersentaseTingkatKemantapanJalan: [],
            setDataPersentaseTingkatKemantapanJalan: (dataFetch) => set({ dataPersentaseTingkatKemantapanJalan: dataFetch }),
        }),
        {
            name: 'dataPersentaseTingkatKemantapanJalan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)