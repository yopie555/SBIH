import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataPMA = create(
    persist(
        (set, get) => ({
            dataPMA: [],
            setDataPMA: (dataFetch) => set({ dataPMA: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)