import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataCapaianProduksiKomoditiHortikultura = create(
    persist(
        (set, get) => ({
            dataCapaianProduksiKomoditiHortikultura: [],
            setDataCapaianProduksiKomoditiHortikultura: (dataFetch) => set({ dataCapaianProduksiKomoditiHortikultura: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)