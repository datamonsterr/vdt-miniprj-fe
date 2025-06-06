import { MousePointer, Table2, Plus, Link, Hand } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { Card } from '@/components/ui/card'
import { ToolType } from '@/types/database'

interface ToolbarProps {
  selectedTool: ToolType
  onToolChange: (tool: ToolType) => void
}

export function Toolbar({ selectedTool, onToolChange }: ToolbarProps) {
  const tools = [
    {
      type: ToolType.SELECT,
      icon: MousePointer,
      label: 'Select',
      description: 'Select and move tables',
    },
    {
      type: ToolType.HAND,
      icon: Hand,
      label: 'Hand',
      description: 'Pan and drag the canvas',
    },
    {
      type: ToolType.TABLE,
      icon: Table2,
      label: 'Table',
      description: 'Add new tables',
    },
    {
      type: ToolType.COLUMN,
      icon: Plus,
      label: 'Column',
      description: 'Add columns to tables',
    },
    {
      type: ToolType.CONNECTION,
      icon: Link,
      label: 'Connection',
      description: 'Create foreign key relationships',
    },
  ]

  return (
    <Card className="p-4 bg-background border-border">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-foreground">Tools</h3>
        <div className="flex flex-col gap-1">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Toggle
                key={tool.type}
                pressed={selectedTool === tool.type}
                onPressedChange={() => onToolChange(tool.type)}
                className="justify-start gap-2 h-auto p-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                aria-label={tool.label}
              >
                <Icon className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">{tool.label}</div>
                  <div className="text-xs opacity-70">{tool.description}</div>
                </div>
              </Toggle>
            )
          })}
        </div>
      </div>
    </Card>
  )
} 