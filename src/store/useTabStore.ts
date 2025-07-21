
import { create } from 'zustand'

type TabStore = {
  amigosTab: number
  gruposTab: number
  fornecedoresTab: number
  empresasTab: number
  setTab: (section: 'amigosTab' | 'gruposTab' | 'fornecedoresTab' | 'empresasTab', index: number) => void
}

export const useTabStore = create<TabStore>((set) => ({
  amigosTab: 0,
  gruposTab: 0,
  fornecedoresTab: 0,
  empresasTab: 0,
  setTab: (section, index) => set({ [section]: index }),
}))
