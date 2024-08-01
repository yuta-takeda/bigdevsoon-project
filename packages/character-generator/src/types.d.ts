export interface CurrentFaceParts {
  base: string
  hair: string
  eyes: string
  ears: string
  nose: string
  mouth: string
  accessories: string
  background: string
}
export type SelectableFaceParts = Exclude<keyof CurrentFaceParts, 'base'>
