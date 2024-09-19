import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataJumlahProduksiPeternakan = create(
    persist(
        (set, get) => ({
            dataJumlahProduksiPeternakan: [],
            setDataJumlahProduksiPeternakan: (dataFetch) => set({ dataJumlahProduksiPeternakan: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)