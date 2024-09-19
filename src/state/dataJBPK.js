import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataJumlahPendudukBerdasarkanKecamatan = create(
    persist(
        (set, get) => ({
            dataJumlahPendudukBerdasarkanKecamatan: [],
            setDataJumlahPendudukBerdasarkanKecamatan: (dataFetch) => set({ dataJumlahPendudukBerdasarkanKecamatan: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)