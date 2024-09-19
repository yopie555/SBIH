import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataProduksiPerikananTangkap = create(
    persist(
        (set, get) => ({
            dataProduksiPerikananTangkap: [],
            setDataProduksiPerikananTangkap: (dataFetch) => set({ dataProduksiPerikananTangkap: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)