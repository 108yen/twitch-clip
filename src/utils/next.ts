import { findPackages } from "find-packages"

export async function getVersion() {
  const packages = await findPackages("./")
  const { version } = packages[0].manifest

  return version ? `v${version}` : ""
}
