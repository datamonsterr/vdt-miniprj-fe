import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'
import { ToolType } from '@/types/database'
import { Download, Edit3, Hand, Link, MousePointer, Table2 } from 'lucide-react'

interface ToolbarProps {
  selectedTool: ToolType
  onToolChange: (tool: ToolType) => void
  onExport?: () => void
}

export function Toolbar({ selectedTool, onToolChange, onExport }: ToolbarProps) {
  const tools = [
    {
      type: ToolType.HAND,
      icon: Hand,
      label: 'Hand',
      description: 'Pan and drag the canvas',
    },
    {
      type: ToolType.MOVE,
      icon: MousePointer,
      label: 'Move',
      description: 'Move tables around',
    },
    {
      type: ToolType.TABLE,
      icon: Table2,
      label: 'New table',
      description: 'Add new tables',
    },
    {
      type: ToolType.EDIT,
      icon: Edit3,
      label: 'Edit',
      description: 'Edit tables and columns',
    },
    {
      type: ToolType.RELATIONSHIP,
      icon: Link,
      label: 'Relationship',
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
        
        {/* Export Button */}
        {onExport && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="w-full justify-start gap-2"
            >
              <Download className="h-4 w-4" />
              Export Schema
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
} 