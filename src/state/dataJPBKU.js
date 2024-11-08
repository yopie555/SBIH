import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataJumlahPendudukBerdasarkanKelompokUmur = create(
    persist(
        (set, get) => ({
            dataJumlahPendudukBerdasarkanKelompokUmur: [],
            setDataJumlahPendudukBerdasarkanKelompokUmur: (dataFetch) => set({ dataJumlahPendudukBerdasarkanKelompokUmur: dataFetch }),
        }),
        {
            name: 'dataJumlahPendudukBerdasarkanKelompokUmur', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)