import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataPerkembanganKondisiKetenagakerjaan = create(
    persist(
        (set, get) => ({
            dataPerkembanganKondisiKetenagakerjaan: [],
            setDataPerkembanganKondisiKetenagakerjaan: (dataFetch) => set({ dataPerkembanganKondisiKetenagakerjaan: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)