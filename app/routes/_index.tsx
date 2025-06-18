import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only"
import Scene from "~/components/Scene"

export const meta: MetaFunction = () => {
  return [
    { title: "My First 3D Scene" },
    { name: "description", content: "Learning React Three Fiber!" },
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