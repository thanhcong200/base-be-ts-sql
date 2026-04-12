/**
 * Unified error codes.
 * We keep the old symbolic names for compatibility but map them to new E-prefixed codes.
 * Add new Exxx constants for future use.
 */
export enum ERROR_CODE {
  // Legacy symbolic names mapped to new E-prefixed codes
  A001 = 'E001',
  A002 = 'E002',
  A003 = 'E003',
  A007 = 'E004',
  A008 = 'E005',
  A009 = 'E006',
  A010 = 'E007',
  A011 = 'E008',
  C001 = 'E009',
  B06 = 'E010',
  CP001 = 'E011',
  CP002 = 'E012',
  M019 = 'E013',

  // Explicit E-prefixed names (same values as above for convenience)
  E001 = 'E001',
  E002 = 'E002',
  E003 = 'E003',
  E004 = 'E004',
  E005 = 'E005',
  E006 = 'E006',
  E007 = 'E007',
  E008 = 'E008',
  E009 = 'E009',
  E010 = 'E010',
  E011 = 'E011',
  E012 = 'E012',
  E013 = 'E013',
}
