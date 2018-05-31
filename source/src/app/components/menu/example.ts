export const examples = [
  {
    'cql': '/*\n' +
    '  This example is provided to illustrate the syntax and properties of CQL types\n' +
    '*/\n' +
    'library CQLTypes version \'1.0\'\n' +
    '\n' +
    'using FHIR version \'3.0.0\' // For Tuple example\n' +
    '\n' +
    'codesystem "LOINC": \'http://loinc.org\'\n' +
    '\n' +
    '// Integer\n' +
    'define CqlInteger: 5\n' +
    'define IntegerUpperBound: 2147483647\n' +
    'define IntegerLowerBound: -2147483647\n' +
    '\n' +
    '// Decimal\n' +
    'define CqlDecimal: 5.0\n' +
    'define CqlDecimalMaxPrecision: 5.00000001\n' +
    '\n' +
    '// Quantity - a number with an associated unit\n' +
    'define CqlQuantity: 5.0 \'g\'\n' +
    '\n' +
    '/*\n' +
    '  Code\n' +
    '  The use of codes to specify meaning within clinical data is ubiquitous. CQL therefore\n' +
    '  supports a top-level construct for dealing with codes using a structure called Code\n' +
    '  that is consistent with the way terminologies are typically represented.\n' +
    '*/\n' +
    'define CodeLiteral: Code \'8480-6\' from "LOINC" display \'Systolic blood pressure\'\n' +
    '\n' +
    '/*\n' +
    '  Concept\n' +
    '  Within clinical information, multiple terminologies can often be used to code for the same\n' +
    '  concept. As such, CQL defines a top-level construct called Concept that allows for multiple\n' +
    '  codes to be specified.\n' +
    '*/\n' +
    'define ConceptTest: Concept { Code \'66071002\' from "LOINC", Code \'B18.1\' from "LOINC"} display \'Type B viral hepatitis\'\n' +
    '\n' +
    '/*\n' +
    '  DateTime\n' +
    '  DateTime values are used to represent an instant along the timeline, known to at\n' +
    '  least the year precision, and potentially to the millisecond precision.\n' +
    '*/\n' +
    'define CqlDateTimeYear: DateTime(2012)\n' +
    'define CqlDateTimeMonth: DateTime(2012, 4)\n' +
    'define CqlDateTimeDay: DateTime(2012, 4, 4)\n' +
    'define CqlDateTimeHour: DateTime(2012, 4, 4, 12)\n' +
    'define CqlDateTimeMinute: DateTime(2012, 4, 4, 12, 30)\n' +
    'define CqlDateTimeSecond: DateTime(2012, 4, 4, 12, 30, 45)\n' +
    'define CqlDateTimeMilli: DateTime(2012, 4, 4, 12, 30, 45, 250)\n' +
    'define CqlDateTimeOffset: DateTime(2012, 4, 4, 12, 30, 45, 250, -7.0)\n' +
    'define CqlDateTimeUTCYear: @2012\n' +
    'define CqlDateTimeUTCMonth: @2012-04\n' +
    'define CqlDateTimeUTCDay: @2012-04-04\n' +
    'define CqlDateTimeUTCHour: @2012-04-04T12\n' +
    'define CqlDateTimeUTCMinute: @2012-04-04T12:30\n' +
    'define CqlDateTimeUTCSecond: @2012-04-04T12:30:45\n' +
    'define CqlDateTimeUTCMilli: @2012-04-04T12:30:45.250\n' +
    'define CqlDateTimeUTCOffset: @2012-04-04T12:30:45.250Z\n' +
    '\n' +
    '/*\n' +
    '  Time\n' +
    '  Time values are used to represent a time of day, independent of the date.\n' +
    '  Time value must be known to at least the hour precision, and potentially\n' +
    '  to the millisecond precision\n' +
    '*/\n' +
    'define CqlTimeHour: Time(12)\n' +
    'define CqlTimeMinute: Time(12, 30)\n' +
    'define CqlTimeSecond: Time(12, 30, 15)\n' +
    'define CqlTimeMilli: Time(12, 30, 15, 100)\n' +
    'define CqlTimeOffset: Time(12, 30, 15, 100, +7.0)\n' +
    'define CqlTimeUTCHour: @T12\n' +
    'define CqlTimeUTCMinute: @T12:30\n' +
    'define CqlTimeUTCSecond: @T12:30:15\n' +
    'define CqlTimeUTCMilli: @T12:30:15.100\n' +
    'define CqlTimeUTCOffset: @T12:30:15.100+07:00\n' +
    '\n' +
    '/*\n' +
    '  Interval\n' +
    '  Intervals in CQL are represented by specifying the low and high points of the interval\n' +
    '  and whether the boundary is inclusive (meaning the boundary point is part of the interval)\n' +
    '  or exclusive (meaning the boundary point is excluded from the interval). Following standard\n' +
    '  mathematics notation, inclusive (closed) boundaries are indicated with square brackets, and\n' +
    '  exclusive (open) boundaries are indicated with parentheses.\n' +
    '*/\n' +
    'define CqlIntervalIncludeBothBoundaries: Interval[2, 7]\n' +
    '// When the Interval is exclusive, the predecessor or successor value for the type is used\n' +
    'define CqlIntervalExcludeStart: Interval(DateTime(2012), DateTime(2014)]\n' +
    'define CqlIntervalExcludeEnd: Interval[DateTime(2012), DateTime(2014))\n' +
    'define CqlIntervalExcludeBoth: Interval(2.99999999, 4.00000001)\n' +
    '\n' +
    '/*\n' +
    '  List\n' +
    '  CQL supports the representation of lists of any type of value (including other lists),\n' +
    '  but all the elements within a given list must be of the same type.\n' +
    '*/\n' +
    'define CqlList: {1, 2, 3}\n' +
    'define CqlListOfList: {{1}, {1,2,3}, {4}, {5}}\n' +
    '\n' +
    '/*\n' +
    '  Tuple\n' +
    '  Structured values, or tuples, are values that contain named elements,\n' +
    '  each having a value of some type. Clinical information such as a Medication,\n' +
    '  a Condition, or an Encounter is represented using tuples.\n' +
    '*/\n' +
    'define CqlTuple: Tuple { id: 5, name: \'Noweigh\'}\n' +
    'define CqlNestedTuples: Tuple { id: 5, name: Tuple { first: \'Noweigh\', last: \'Jose\'} }\n' +
    'define CqlTupleClinicalInformation: Encounter { status: FHIR.EncounterStatus { value: \'planned\' } }\n' +
    '\n' +
    '// String\n' +
    'define CqlString: CqlTuple.name\n'
  },
  {
    'cql': '/*\n' +
    '\tThis example is provided to illustrate data retrieval in different contexts.\n' +
    '    1. Run the library as is.\n' +
    '       Note that no resources are returned when the patient id is null.\n' +
    '    2. Set the patient id to Patient-1136 and run again.\n' +
    '       Note that all the returned Procedures refer to Patient-1136 as the subject.\n' +
    '    3. Comment out context Patient, uncomment context Population, and run again.\n' +
    '       This will return all the Procedures in the FHIR Server.\n' +
    '*/\n' +
    'library Retrieve1 version \'1.0\'\n' +
    '\n' +
    'using FHIR version \'3.0.0\'\n' +
    '\n' +
    'context Patient\n' +
    '// context Population\n' +
    '\n' +
    'define Procedures: [Procedure]\n'
  },
  {
    'cql': '/*\n' +
    '\tThis example is provided to illustrate retrievals with a valueset and a code filter.\n' +
    '    1. Set the patient id in the configuration as example-rec-04-long-acting-opioid-no-prefetch. \n' +
    '       Leave other config as default.\n' +
    '    2. Run the library.\n' +
    '*/\n' +
    'library Retrieve2 version \'1.0\'\n' +
    '\n' +
    'using FHIR version \'3.0.0\'\n' +
    '\n' +
    'include FHIRHelpers version \'3.0.0\' called FHIRHelpers\n' +
    '\n' +
    'codesystem "Medication Request Category Codes": \'http://hl7.org/fhir/medication-request-category\'\n' +
    '\n' +
    'valueset "Ambulatory Abuse Potential Opioids": \'http://hl7.org/fhir/ig/opioid-cds/ValueSet/opioids-abused-in-ambulatory-care\'\n' +
    '\n' +
    'code "Outpatient": \'outpatient\' from "Medication Request Category Codes"\n' +
    '\n' +
    'context Patient\n' +
    '\n' +
    '/*\n' +
    '  The "Active Ambulatory Opioid Rx" expression returns all the MedicationRequests associated with the \n' +
    '  patient where the MedicationRequest.medication code is in the "Ambulatory Abuse Potential Opioids" \n' +
    '  valueset, the status is active and the category code is "outpatient". You can verify this by examining \n' +
    '  the returned MedicationRequest.\n' +
    '*/\n' +
    'define "Active Ambulatory Opioid Rx":\n' +
    '  [MedicationRequest: "Ambulatory Abuse Potential Opioids"] Rx\n' +
    '    where Rx.status.value = \'active\'\n' +
    '      and Rx.category.coding[0] ~ "Outpatient"'
  }
];
