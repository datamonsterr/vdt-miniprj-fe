import { useStoreWithEqualityFn } from 'zustand/traditional'
import type { TemporalState } from 'zundo'
import { useSchemaStore } from '@/stores/schema-store'

// Type for the partialized state that we track in undo/redo
type PartializedSchemaState = {
  tables: any[]
  foreignKeys: any[]
}

// Create a reactive hook for the temporal store
export function useTemporalStore(): TemporalState<PartializedSchemaState>
export function useTemporalStore<T>(
  selector: (state: TemporalState<PartializedSchemaState>) => T
): T
export function useTemporalStore<T>(
  selector: (state: TemporalState<PartializedSchemaState>) => T,
  equality: (a: T, b: T) => boolean
): T
export function useTemporalStore<T>(
  selector?: (state: TemporalState<PartializedSchemaState>) => T,
  equality?: (a: T, b: T) => boolean
) {
  return useStoreWithEqualityFn(
    useSchemaStore.temporal,
    selector as any,
    equality
  )
} 