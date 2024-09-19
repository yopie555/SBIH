import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataJumlahRumahTidakLayakHuni = create(
    persist(
        (set, get) => ({
            dataJumlahRumahTidakLayakHuni: [],
            setDataJumlahRumahTidakLayakHuni: (dataFetch) => set({ dataJumlahRumahTidakLayakHuni: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)