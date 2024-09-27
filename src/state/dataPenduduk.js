import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataPenduduk = create(
    persist(
        (set, get) => ({
            dataPenduduk: [],
            setDataPenduduk: (dataFetch) => set({ dataPenduduk: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)