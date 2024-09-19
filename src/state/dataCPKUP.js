import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataCapaianProduksiKomoditiUnggulanPerkebunan = create(
    persist(
        (set, get) => ({
            dataCapaianProduksiKomoditiUnggulanPerkebunan: [],
            setDataCapaianProduksiKomoditiUnggulanPerkebunan: (dataFetch) => set({ dataCapaianProduksiKomoditiUnggulanPerkebunan: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)