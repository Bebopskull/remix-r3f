import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only"
import Scene from "~/components/Scene"

export const meta: MetaFunction = () => {
  return [
    { title: "nikai.xyz" },
    { name: "description", content: "we are nikai.xyz" },
  ]
}

export default function Index() {
  return (
    <group>
      <ClientOnly fallback={//in case the browser doesn't has 3d support, show a fallback
        <div style={{ height: '400px', background: '#f0f0f0' }}>
          Loading 3D experience...
        </div>
      }>
      {() => <Scene />}
      </ClientOnly>
    </group>
  )
}