import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataJumlahPendudukBerdasarkanKecamatan = create(
    persist(
        (set, get) => ({
            dataJumlahPendudukBerdasarkanKecamatan: [],
            setDataJumlahPendudukBerdasarkanKecamatan: (dataFetch) => set({ dataJumlahPendudukBerdasarkanKecamatan: dataFetch }),
        }),
        {
            name: 'dataJumlahPendudukBerdasarkanKecamatan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)