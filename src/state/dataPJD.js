import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataPanjangJalanDibangun = create(
    persist(
        (set, get) => ({
            dataPanjangJalanDibangun: [],
            setDataPanjangJalanDibangun: (dataFetch) => set({ dataPanjangJalanDibangun: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)