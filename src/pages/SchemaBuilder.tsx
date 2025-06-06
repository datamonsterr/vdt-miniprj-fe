import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { SchemaCanvas } from '@/components/schema-builder/SchemaCanvas'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import type { Table, ForeignKey } from '@/types/database'
import { Z_INDEX } from '@/common'

export default function SchemaBuilder() {
    const navigate = useNavigate()
    
    const handleSchemaChange = useCallback((data: { tables: Table[]; foreignKeys: ForeignKey[] }) => {
        console.log('Schema changed:', data)
    }, [])

    const handleBackToDashboard = () => {
        navigate('/dashboard')
    }

    return (
        <div className="h-screen w-full relative">
            {/* Back to Dashboard Button */}
            <div 
                className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50" 
                style={{ zIndex: Z_INDEX.TOOLBAR + 1 }}
            >
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToDashboard}
                    className="bg-background/95 backdrop-blur-sm border shadow-lg hover:bg-accent"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>
            </div>

            <SchemaCanvas 
                onSchemaChange={handleSchemaChange}
                showToolbar={true}
                showUndoRedo={true}
                showUserSettings={false}
            />
        </div>
    )
} 