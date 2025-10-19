import { Select, SelectItem } from '@heroui/select'
import { Button } from "@heroui/button"

import { Port } from '@/hooks/interceptor'

export type SelectorProps = {
  ports: Port[]
  selected: string | null

  getPorts: () => void
}

export function Selector({ ports, selected, getPorts }: SelectorProps) {
  return <div className="grid grid-cols-[1fr_auto] gap-2 w-full">
    <Select
      className="w-full h-full"
      classNames={{ popoverContent: "dark" }}
      color="primary"
      variant="underlined"
      items={ports.filter(port => port.pnpId || port.locationId)}
      label="Port"
      placeholder="Select a port."
      selectedKeys={selected ? [selected] : undefined}
    >
      {(port) => <SelectItem key={port.path} textValue={port.pnpId}>
        <div className="grid grid-cols-[1fr_auto] w-full gap-5">
          <div className="text-foreground">
            {port.pnpId}
          </div>

          <div className="text-foreground-400">
            {port.path}
          </div>
        </div>
      </SelectItem>}
    </Select>

    <Button
      className="aspect-square h-full w-full"
      color="primary"
      variant="light"
      isIconOnly
      onPress={() => getPorts()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5.5">
        <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
      </svg>
    </Button>
  </div>
}