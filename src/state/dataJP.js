import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataJumlahPenduduk = create(
    persist(
        (set, get) => ({
            dataJumlahPenduduk: [],
            setDataJumlahPenduduk: (dataFetch) => set({ dataJumlahPenduduk: dataFetch }),
        }),
        {
            name: 'dataJumlahPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)