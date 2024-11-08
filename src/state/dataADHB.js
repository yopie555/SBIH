import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataAtasDasarHargaBerlaku = create(
    persist(
        (set, get) => ({
            dataAtasDasarHargaBerlaku: [],
            setDataAtasDasarHargaBerlaku: (dataFetch) => set({ dataAtasDasarHargaBerlaku: dataFetch }),
        }),
        {
            name: 'dataAtasDasarHargaBerlaku', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)