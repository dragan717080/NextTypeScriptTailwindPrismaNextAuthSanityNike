"use client";

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '@/sanity/schemas'

const config = defineConfig({
  name: 'default',
  title: 'Next Sanity Nike',

  projectId: 'u36lj56g',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: { types: schemaTypes },

  basePath: '/admin'
})

export default function AdminPage() {

  return (
    <NextStudio config={config} />
  )
}
