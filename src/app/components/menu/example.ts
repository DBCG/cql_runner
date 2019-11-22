export const examples = [
  {
    cql: '/*\n' +
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
    cql: '/*\n' +
    'Cervical Cancer Screening (CCS)\n' +
    '\n' +
    'This is a CQL authoring exercise. Provide logic for the expressions with null results.\n' +
    '\n' +
    'References:\n' +
    '  CQL Specification Appendix B: https://cql.hl7.org/STU3/09-b-cqlreference.html\n' +
    '  HEDIS Implementation Guide Profiles: http://build.fhir.org/ig/cqframework/hedis-ig/profiles.html\n' +
    '  FHIR STU3 Resources: http://hl7.org/fhir/STU3/resourcelist.html\n' +
    '*/\n' +
    '\n' +
    'library CCS_FHIR version \'1.0.1\'\n' +
    '\n' +
    'using FHIR version \'3.0.0\'\n' +
    '\n' +
    'include FHIRHelpers version \'3.0.0\'\n' +
    '\n' +
    '/*\n' +
    'Description\n' +
    'The percentage of women 21-64 years of age who were screened for cervical\n' +
    '    cancer using either of the following criteria:\n' +
    '  * Women 21-64 years of age who had cervical cytology performed every 3 years.\n' +
    '  * Women 30-64 years of age who had cervical cytology/human papillomavirus\n' +
    '    (HPV) co-testing performed every 5 years.\n' +
    '*/\n' +
    '\n' +
    'valueset "Absence of Cervix Value Set": \'2.16.840.1.113883.3.464.1004.1123.17\'\n' +
    'valueset "Cervical Cytology Value Set": \'2.16.840.1.113883.3.464.1004.1208\'\n' +
    'valueset "HPV Tests Value Set": \'2.16.840.1.113883.3.464.1004.1265\'\n' +
    '\n' +
    'parameter "Measurement Period" default Interval[@2017-01-01T00:00, @2017-12-31T00:00]\n' +
    '\n' +
    'define "First Predecessor Year":\n' +
    '  Interval[start of "Measurement Period" - 1 year, end of "Measurement Period" - 1 year)\n' +
    '\n' +
    'define "Second Predecessor Year":\n' +
    '  Interval[start of "Measurement Period" - 2 years, end of "Measurement Period" - 2 year)\n' +
    '\n' +
    'define "Third Predecessor Quarter":\n' +
    '  Interval[start of "Measurement Period" - 2 years - 3 months, end of "Measurement Period" - 3 years)\n' +
    '\n' +
    'define "Lookback Interval Two More Years":\n' +
    '  Interval[start of "Measurement Period" - 2 years, end of "Measurement Period")\n' +
    '\n' +
    'define "Lookback Interval Four More Years":\n' +
    '  Interval[start of "Measurement Period" - 4 years, end of "Measurement Period")\n' +
    '\n' +
    'context Patient\n' +
    '\n' +
    '/*\n' +
    'Initial Population\n' +
    '*/\n' +
    '\n' +
    'define "Initial Population":\n' +
    '  "Is Female"\n' +
    '    and "Is Age 24 to 64 at end of Measurement Period"\n' +
    '\n' +
    'define "Denominator":\n' +
    '  true\n' +
    '\n' +
    'define "Numerator":\n' +
    '  case\n' +
    '    when "Is Cervical Cytology Test In Last 3 Years" then true\n' +
    '    when (not "Is Age 30 to 64 at end of Measurement Period") then false\n' +
    '    when "Is Cervical Cytology Plus HPV Test In Last 5 Years" then true\n' +
    '    else false\n' +
    '  end\n' +
    '\n' +
    '// Determine whether the Patient is Female\n' +
    '// (Returns Boolean value)\n' +
    'define "Is Female":\n' +
    '  null\n' +
    '\n' +
    '// Determine whether the Patient is between the ages of 24 and 64 at the end of the Measurement Period\n' +
    '// (Returns Boolean value)\n' +
    'define "Is Age 24 to 64 at end of Measurement Period":\n' +
    '  null\n' +
    '\n' +
    '// Determine whether the Patient is between the ages of 30 and 64 at the end of the Measurement Period\n' +
    '// (Returns Boolean value)\n' +
    'define "Is Age 30 to 64 at end of Measurement Period":\n' +
    '  null\n' +
    '\n' +
    'define "Is Cervical Cytology Test In Last 3 Years":\n' +
    '  exists (\n' +
    '    "Dates of Cervical Cytology Tests" WhenCC\n' +
    '      where WhenCC included in day of "Lookback Interval Two More Years"\n' +
    '  )\n' +
    '\n' +
    'define "Is Cervical Cytology Plus HPV Test In Last 5 Years":\n' +
    '  exists (\n' +
    '    "Dates of Cervical Cytology Tests" WhenCC\n' +
    '      with "Dates of HPV Tests" WhenHPV\n' +
    '        such that (((difference in days between start of WhenCC and start of WhenHPV) <= 4)\n' +
    '          and AgeInYearsAt(start of WhenCC) >= 30\n' +
    '          and AgeInYearsAt(start of WhenHPV) >= 30\n' +
    '          and WhenCC included in day of "Lookback Interval Four More Years"\n' +
    '          and WhenHPV included in day of "Lookback Interval Four More Years")\n' +
    '  )\n' +
    '\n' +
    'define "Dates of Cervical Cytology Tests":\n' +
    '  ([Procedure: "Cervical Cytology Value Set"] Proc\n' +
    '    where Proc.status = \'completed\'\n' +
    '    return Proc.performed)\n' +
    '  union\n' +
    '  ([DiagnosticReport: "Cervical Cytology Value Set"] DiagRep\n' +
    '    where DiagRep.status in { \'preliminary\', \'final\', \'amended\', \'corrected\', \'appended\' }\n' +
    '    return DiagRep.effective)\n' +
    '  union\n' +
    '  ([Observation: "Cervical Cytology Value Set"] Obs\n' +
    '    where Obs.status in { \'final\', \'amended\' }\n' +
    '    return Obs.effective)\n' +
    '\n' +
    'define "Dates of HPV Tests":\n' +
    '  ([Procedure: "HPV Tests Value Set"] Proc\n' +
    '    where Proc.status = \'completed\'\n' +
    '    return Proc.performed)\n' +
    '  union\n' +
    '  ([DiagnosticReport: "HPV Tests Value Set"] DiagRep\n' +
    '    where DiagRep.status.value in { \'preliminary\', \'final\', \'amended\', \'corrected\', \'appended\' }\n' +
    '    return DiagRep.effective)\n' +
    '  union\n' +
    '  ([Observation: "HPV Tests Value Set"] Obs\n' +
    '    where Obs.status.value in { \'final\', \'amended\' }\n' +
    '    return Obs.effective)\n' +
    '\n' +
    'define "Denominator Exclusion":\n' +
    '  "Is Hysterectomy"\n' +
    '\n' +
    '// Determine whether a Procedure exists with code in the "Absence of Cervix Value Set"\n' +
    '//   where the Procedure status is completed and the performed period occurs on the\n' +
    '//   same day or before the end of the Measurement Period\n' +
    'define "Is Hysterectomy":\n' +
    '  exists (\n' +
    '    null\n' +
    '  )\n'
  },
  {
    cql: '/*\n' +
    'Colorectal Cancer Screening (COL)\n' +
    '\n' +
    'This is a CQL authoring exercise. Provide logic for the expressions with null results.\n' +
    '\n' +
    'References:\n' +
    '  CQL Specification Appendix B: https://cql.hl7.org/STU3/09-b-cqlreference.html\n' +
    '  HEDIS Implementation Guide Profiles: http://build.fhir.org/ig/cqframework/hedis-ig/profiles.html\n' +
    '  FHIR STU3 Resources: http://hl7.org/fhir/STU3/resourcelist.html\n' +
    '*/\n' +
    '\n' +
    'library COL_FHIR version \'1.0.1\'\n' +
    '\n' +
    'using FHIR version \'3.0.0\'\n' +
    '\n' +
    'include FHIRHelpers version \'3.0.0\'\n' +
    '\n' +
    '/*\n' +
    'Description\n' +
    'The percentage of members 50-75 years of age who had appropriate screening for colorectal cancer.\n' +
    '*/\n' +
    '\n' +
    'valueset "Colonoscopy Value Set": \'2.16.840.1.113883.3.464.1004.1064\'\n' +
    'valueset "Colorectal Cancer Value Set": \'2.16.840.1.113883.3.464.1004.1065\'\n' +
    'valueset "CT Colonography Value Set": \'2.16.840.1.113883.3.464.1004.1421\'\n' +
    'valueset "FIT-DNA Value Set": \'2.16.840.1.113883.3.464.1004.1420\'\n' +
    'valueset "Flexible Sigmoidoscopy Value Set": \'2.16.840.1.113883.3.464.1004.1102\'\n' +
    'valueset "FOBT Value Set": \'2.16.840.1.113883.3.464.1004.1093\'\n' +
    'valueset "Total Colectomy Value Set": \'2.16.840.1.113883.3.464.1004.1250\'\n' +
    '\n' +
    'parameter "Measurement Period" default Interval[@2017-01-01T00:00, @2017-12-31T00:00]\n' +
    '\n' +
    'define "Lookback Interval Two More Years":\n' +
    '  Interval[start of "Measurement Period" - 2 years, end of "Measurement Period")\n' +
    '\n' +
    'define "Lookback Interval Four More Years":\n' +
    '  Interval[start of "Measurement Period" - 4 years, end of "Measurement Period")\n' +
    '\n' +
    'define "Lookback Interval Nine More Years":\n' +
    '  Interval[start of "Measurement Period" - 9 years, end of "Measurement Period")\n' +
    '\n' +
    'context Patient\n' +
    '\n' +
    'define "Initial Population":\n' +
    '  "Is Age 51 to 75 at End"\n' +
    '\n' +
    'define "Denominator":\n' +
    '  true\n' +
    '\n' +
    'define "Numerator":\n' +
    '  "Is Colorectal Cancer Screening"\n' +
    '    and not "Denominator Exclusion"\n' +
    '\n' +
    '// Determine whether the Patient is between the ages of 51 and 75 at the end of the Measurement Period\n' +
    '// (Returns Boolean value)\n' +
    'define "Is Age 51 to 75 at End":\n' +
    '  null\n' +
    '\n' +
    'define "Is Colorectal Cancer Screening":\n' +
    '  "Is Fecal Occult Blood Test In Last Year"\n' +
    '    or "Is Flexible Sigmoidoscopy In Last Five Years"\n' +
    '    or "Is Colonoscopy In Last Ten Years"\n' +
    '    or "Is CT Colonography In Last Five Years"\n' +
    '    or "Is FIT-DNA Test In Last Three Years"\n' +
    '\n' +
    '// Determine whether an Observation exists with code in the "FOBT Value Set"\n' +
    '//   where the Observation status is either final or amended and the effective datetime occurs\n' +
    '//   during the Measurement Period\n' +
    'define "Is Fecal Occult Blood Test In Last Year":\n' +
    '  exists (\n' +
    '    null\n' +
    '  )\n' +
    '\n' +
    'define "Flexible Sigmoidoscopy Reports":\n' +
    '  [DiagnosticReport: "Flexible Sigmoidoscopy Value Set"]\n' +
    '\n' +
    'define "Is Flexible Sigmoidoscopy In Last Five Years":\n' +
    '  exists(\n' +
    '    "Flexible Sigmoidoscopy Reports" DiagRep\n' +
    '      where DiagRep.status in { \'preliminary\', \'final\', \'amended\', \'corrected\', \'appended\' }\n' +
    '        and DiagRep.effective overlaps day of "Lookback Interval Four More Years"\n' +
    '  )\n' +
    '\n' +
    'define "Colonoscopy Reports":\n' +
    '  [DiagnosticReport: "Colonoscopy Value Set"]\n' +
    '\n' +
    'define "Is Colonoscopy In Last Ten Years":\n' +
    '  exists(\n' +
    '    "Colonoscopy Reports" DiagRep\n' +
    '      where DiagRep.status in { \'preliminary\', \'final\', \'amended\', \'corrected\', \'appended\' }\n' +
    '        and DiagRep.effective overlaps day of "Lookback Interval Nine More Years"\n' +
    '  )\n' +
    '\n' +
    'define "Is CT Colonography In Last Five Years":\n' +
    '  exists(\n' +
    '    [DiagnosticReport: "CT Colonography Value Set"] DiagRep\n' +
    '      where DiagRep.status in { \'preliminary\', \'final\', \'amended\', \'corrected\', \'appended\' }\n' +
    '        and DiagRep.effective overlaps day of "Lookback Interval Four More Years"\n' +
    '  )\n' +
    '\n' +
    'define "FIT-DNA Observations":\n' +
    '  [Observation: "FIT-DNA Value Set"]\n' +
    '\n' +
    'define "Is FIT-DNA Test In Last Three Years":\n' +
    '  exists(\n' +
    '    "FIT-DNA Observations" Obs\n' +
    '      where Obs.status in { \'final\', \'amended\' }\n' +
    '        and Obs.effective in day of "Lookback Interval Two More Years"\n' +
    '  )\n' +
    '\n' +
    'define "Denominator Exclusion":\n' +
    '  "Is Colorectal Cancer"\n' +
    '      or "Is Total Colectomy"\n' +
    '\n' +
    '// Determine whether a Condition exists with code in the "Colorectal Cancer Value Set"\n' +
    '//   where the Condition verificationStatus is confirmed and the assertedDate occurs before\n' +
    '//   the end of the Measurement Period\n' +
    'define "Is Colorectal Cancer":\n' +
    '  exists(\n' +
    '    null\n' +
    '  )\n' +
    '\n' +
    '// Determine whether a Procedure exists with code in the "Total Colectomy Value Set"\n' +
    '//   where the Procedure status is completed and the performed period occurs before\n' +
    '//   the end of the Measurement Period\n' +
    'define "Is Total Colectomy":\n' +
    '  exists(\n' +
    '    null\n' +
    '  )\n'
  }
];
