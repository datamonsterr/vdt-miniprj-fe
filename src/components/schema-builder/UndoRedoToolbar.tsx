import { Undo2, Redo2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTemporalStore } from '@/hooks/useTemporalStore'

export function UndoRedoToolbar() {
  // Use the reactive temporal store hook
  const { undo, redo, clear, pastStates, futureStates } = useTemporalStore((state) => state)

  const canUndo = pastStates.length > 0
  const canRedo = futureStates.length > 0

  return (
    <div className="flex items-center gap-2 p-2 bg-background border border-border rounded-lg">
      {/* Undo Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => undo()}
        disabled={!canUndo}
        className="flex items-center gap-1"
        title={`Undo last action (Ctrl+Z) - ${pastStates.length} action${pastStates.length !== 1 ? 's' : ''} available`}
      >
        <Undo2 className="h-4 w-4" />
        Undo
      </Button>

      {/* Redo Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => redo()}
        disabled={!canRedo}
        className="flex items-center gap-1"
        title={`Redo last undone action (Ctrl+Shift+Z or Ctrl+Y) - ${futureStates.length} action${futureStates.length !== 1 ? 's' : ''} available`}
      >
        <Redo2 className="h-4 w-4" />
        Redo
      </Button>

      {/* Clear History Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={clear}
        disabled={!canUndo && !canRedo}
        className="flex items-center gap-1"
        title="Clear all undo/redo history"
      >
        <RotateCcw className="h-4 w-4" />
        Clear
      </Button>

      {/* History Status */}
      <div className="text-xs text-muted-foreground ml-2 px-2 py-1 bg-muted rounded">
        History: {pastStates.length} / {futureStates.length}
      </div>
    </div>
  )
} 