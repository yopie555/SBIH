import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataPertumbuhanPenduduk = create(
    persist(
        (set, get) => ({
            dataPertumbuhanPenduduk: [],
            setDataPertumbuhanPenduduk: (dataFetch) => set({ dataPertumbuhanPenduduk: dataFetch }),
        }),
        {
            name: 'dataPertumbuhanPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)