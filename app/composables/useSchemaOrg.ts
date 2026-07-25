interface SchemaOrgItem {
  '@type': string | string[]
  [key: string]: unknown
}

export function useSchemaOrg(schemas: SchemaOrgItem[] | (() => SchemaOrgItem[])) {
  const resolvedSchemas = computed(() => {
    const s = typeof schemas === 'function' ? schemas() : schemas
    return Array.isArray(s) ? s : [s]
  })

  useHead({
    script: resolvedSchemas.value.map(schema => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        ...schema,
      }),
    })),
  })
}
