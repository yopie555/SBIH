import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataPertumbuhanEkonomi = create(
    persist(
        (set, get) => ({
            dataPertumbuhanEkonomi: [],
            setDataPertumbuhanEkonomi: (dataFetch) => set({ dataPertumbuhanEkonomi: dataFetch }),
        }),
        {
            name: 'dataPertumbuhanEkonomi', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)