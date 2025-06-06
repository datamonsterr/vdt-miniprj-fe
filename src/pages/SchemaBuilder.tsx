import React, { useCallback } from 'react'
import { SchemaCanvas } from '@/components/schema-builder/SchemaCanvas'
import type { Table, ForeignKey } from '@/types/database'

export default function SchemaBuilder() {
    const handleSchemaChange = useCallback((data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
        console.log('Schema changed:', data)
    }, [])

    return (
        <div className="h-screen w-full">
            <SchemaCanvas 
                onSchemaChange={handleSchemaChange}
                showToolbar={true}
                showUndoRedo={true}
            />
        </div>
    )
} 