import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataKunjunganWisata = create(
    persist(
        (set, get) => ({
            dataKunjunganWisata: [],
            setDataKunjunganWisata: (dataFetch) => set({ dataKunjunganWisata: dataFetch }),
        }),
        {
            name: 'dataKunjunganWisata', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)