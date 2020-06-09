import { ReactType } from "react"
import { Loupe } from "./Loupe"

export type Banner = "loupe"

export const banners: Record<Banner, ReactType> = {
  loupe: Loupe,
}
