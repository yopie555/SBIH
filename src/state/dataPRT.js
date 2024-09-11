import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataPenggunaanAirBersih = create(
    persist(
        (set, get) => ({
            dataPenggunaanAirBersih: [],
            setDataPenggunaanAirBersih: (dataFetch) => set({ dataPenggunaanAirBersih: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)