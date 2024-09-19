import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataProduksiPerikananBudidaya = create(
    persist(
        (set, get) => ({
            dataProduksiPerikananBudidaya: [],
            setDataProduksiPerikananBudidaya: (dataFetch) => set({ dataProduksiPerikananBudidaya: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)