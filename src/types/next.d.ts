import "next"

declare module "next" {
  export type NextPageProps<
    T extends
      | object
      | Record<string, string | string[]>
      | undefined = undefined,
  > = {
    params: Promise<T>
    searchParams: Promise<Record<string, string | string[] | undefined>>
  }
}
