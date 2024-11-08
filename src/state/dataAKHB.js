import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataAngkaKeberlangsunganHidupBayi = create(
    persist(
        (set, get) => ({
            dataAngkaKeberlangsunganHidupBayi: [],
            setDataAngkaKeberlangsunganHidupBayi: (dataFetch) => set({ dataAngkaKeberlangsunganHidupBayi: dataFetch }),
        }),
        {
            name: 'dataAngkaKeberlangsunganHidupBayi', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)