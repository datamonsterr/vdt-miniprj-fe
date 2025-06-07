import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Database, Users, FileText } from 'lucide-react'
import React from 'react'

const meta: Meta<typeof Card> = {
  title: 'UI Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Card

A flexible card component with header, content, and footer sections.

## Usage
\`\`\`tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area where you can put any content.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="p-6">
        <p>A simple card with just content.</p>
      </CardContent>
    </Card>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Schema
        </CardTitle>
        <CardDescription>
          Design your database schema visually
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Create tables, columns, and relationships with an intuitive drag-and-drop interface.</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button>Open Designer</Button>
        <Button variant="outline">View Docs</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pro Feature</CardTitle>
          <Badge variant="secondary">New</Badge>
        </div>
        <CardDescription>
          Advanced schema validation and export features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>SQL export</li>
          <li>Schema validation</li>
          <li>Team collaboration</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Upgrade to Pro</Button>
      </CardFooter>
    </Card>
  ),
}

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Schema Builder
          </CardTitle>
          <CardDescription>
            Create and design database schemas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Visual drag-and-drop interface for database design
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Team Management
          </CardTitle>
          <CardDescription>
            Manage your team and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Collaborate with your team on schema designs
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Documentation
          </CardTitle>
          <CardDescription>
            View guides and examples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Learn how to use the schema builder effectively
          </p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const Compact: Story = {
  render: () => (
    <Card className="w-[250px]">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Database className="h-8 w-8 text-primary" />
          <div>
            <h4 className="font-medium">Quick Schema</h4>
            <p className="text-sm text-muted-foreground">2 tables, 3 relationships</p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
} 