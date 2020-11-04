/*
Colorectal Cancer Screening (COL)
*/

library COLFHIR version '1.0.1'

using FHIR version '4.0.1'

include FHIRHelpers version '4.0.1'

/*
Description
The percentage of members 50-75 years of age who had appropriate screening for colorectal cancer.
*/

codesystem "CONDCLINSTATUS": 'http://terminology.hl7.org/CodeSystem/condition-clinical'
codesystem "CONDVERSTATUS": 'http://terminology.hl7.org/CodeSystem/condition-ver-status'

valueset "Colonoscopy Value Set": '2.16.840.1.113883.3.464.1004.1064'
valueset "Colorectal Cancer Value Set": '2.16.840.1.113883.3.464.1004.1065'
valueset "CT Colonography Value Set": '2.16.840.1.113883.3.464.1004.1421'
valueset "FIT-DNA Value Set": '2.16.840.1.113883.3.464.1004.1420'
valueset "Flexible Sigmoidoscopy Value Set": '2.16.840.1.113883.3.464.1004.1102'
valueset "FOBT Value Set": '2.16.840.1.113883.3.464.1004.1093'
valueset "Total Colectomy Value Set": '2.16.840.1.113883.3.464.1004.1250'

code "active": 'active' from "CONDCLINSTATUS" display 'Active'
code "confirmed": 'confirmed' from "CONDVERSTATUS" display 'Confirmed'

parameter "Measurement Period" default Interval[@2017-01-01T00:00, @2017-12-31T00:00]

define "Lookback Interval Two More Years":
  Interval[start of "Measurement Period" - 2 years, end of "Measurement Period")

define "Lookback Interval Four More Years":
  Interval[start of "Measurement Period" - 4 years, end of "Measurement Period")

define "Lookback Interval Nine More Years":
  Interval[start of "Measurement Period" - 9 years, end of "Measurement Period")

context Patient

define "Initial Population":
  "Is Age 51 to 75 at End"

define "Denominator":
  true

define "Numerator":
  "Is Colorectal Cancer Screening"
    and not "Denominator Exclusion"

define "Is Age 51 to 75 at End":
  AgeInYearsAt(end of "Measurement Period") between 51 and 75

define "Is Colorectal Cancer Screening":
  "Is Fecal Occult Blood Test In Last Year"
    or "Is Flexible Sigmoidoscopy In Last Five Years"
    or "Is Colonoscopy In Last Ten Years"
    or "Is CT Colonography In Last Five Years"
    or "Is FIT-DNA Test In Last Three Years"

define "FOBT Observations":
  [Observation: "FOBT Value Set"]

define "Is Fecal Occult Blood Test In Last Year":
  exists(
    "FOBT Observations" Obs
      where Obs.status in { 'final', 'amended' }
        and Obs.effective in day of "Measurement Period"
  )

define "Flexible Sigmoidoscopy Reports":
  [DiagnosticReport: "Flexible Sigmoidoscopy Value Set"]

define "Is Flexible Sigmoidoscopy In Last Five Years":
  exists(
    "Flexible Sigmoidoscopy Reports" DiagRep
      where DiagRep.status in { 'preliminary', 'final', 'amended', 'corrected', 'appended' }
        and DiagRep.effective overlaps day of "Lookback Interval Four More Years"
  )

define "Colonoscopy Reports":
  [DiagnosticReport: "Colonoscopy Value Set"]

define "Is Colonoscopy In Last Ten Years":
  exists(
    "Colonoscopy Reports" DiagRep
      where DiagRep.status in { 'preliminary', 'final', 'amended', 'corrected', 'appended' }
        and DiagRep.effective overlaps day of "Lookback Interval Nine More Years"
  )

define "Is CT Colonography In Last Five Years":
  exists(
    [DiagnosticReport: "CT Colonography Value Set"] DiagRep
      where DiagRep.status in { 'preliminary', 'final', 'amended', 'corrected', 'appended' }
        and DiagRep.effective overlaps day of "Lookback Interval Four More Years"
  )

define "FIT-DNA Observations":
  [Observation: "FIT-DNA Value Set"]

define "Is FIT-DNA Test In Last Three Years":
  exists(
    "FIT-DNA Observations" Obs
      where Obs.status in { 'final', 'amended' }
        and Obs.effective in day of "Lookback Interval Two More Years"
  )

define "Denominator Exclusion":
  "Is Colorectal Cancer"
      or "Is Total Colectomy"

define "Colorectal Cancer Conditions":
  [Condition: "Colorectal Cancer Value Set"]

define "Is Colorectal Cancer":
  exists(
    "Colorectal Cancer Conditions" Cond
      where Cond.verificationStatus ~ "confirmed"
        and Cond.recordedDate before day of end of "Measurement Period"
  )

define "Total Colectomy Procedures":
  [Procedure: "Total Colectomy Value Set"]

define "Is Total Colectomy":
  exists(
    "Total Colectomy Procedures" Proc
      where Proc.status = 'completed'
        and end of (Proc.performed as FHIR.Period) before day of end of "Measurement Period"
  )
