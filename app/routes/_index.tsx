import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only"
import Scene from "~/components/Scene"

export const meta: MetaFunction = () => {
  return [
    { title: "nikai.xyz" },
    { name: "description", content: "We are Nikai Interactive" },
  ]
}

export default function Index() {
  return (
    <div>
      <ClientOnly fallback={
        <div style={{ height: '400px', background: '#f0f0f0' }}>
          Loading 3D experience...
        </div>
      }>
      {() => <Scene />}
      </ClientOnly>
    </div>
  )
}