/*
Cervical Cancer Screening (CCS)
*/

library CCSFHIR version '1.0.1'

using FHIR version '4.0.1'

include FHIRHelpers version '4.0.1'

/*
Description
The percentage of women 21-64 years of age who were screened for cervical
    cancer using either of the following criteria:
  * Women 21-64 years of age who had cervical cytology performed every 3 years.
  * Women 30-64 years of age who had cervical cytology/human papillomavirus
    (HPV) co-testing performed every 5 years.
*/

valueset "Absence of Cervix Value Set": '2.16.840.1.113883.3.464.1004.1123.17'
valueset "Cervical Cytology Value Set": '2.16.840.1.113883.3.464.1004.1208'
valueset "HPV Tests Value Set": '2.16.840.1.113883.3.464.1004.1265'

parameter "Measurement Period" default Interval[@2017-01-01T00:00, @2017-12-31T00:00]

define "First Predecessor Year":
  Interval[start of "Measurement Period" - 1 year, end of "Measurement Period" - 1 year)

define "Second Predecessor Year":
  Interval[start of "Measurement Period" - 2 years, end of "Measurement Period" - 2 year)

define "Third Predecessor Quarter":
  Interval[start of "Measurement Period" - 2 years - 3 months, end of "Measurement Period" - 3 years)

define "Lookback Interval Two More Years":
  Interval[start of "Measurement Period" - 2 years, end of "Measurement Period")

define "Lookback Interval Four More Years":
  Interval[start of "Measurement Period" - 4 years, end of "Measurement Period")

context Patient

/*
Initial Population
*/

define "Initial Population":
  "Is Female"
    and "Is Age 24 to 64 at end of Measurement Period"

define "Denominator":
  true

define "Numerator":
  case
    when "Is Cervical Cytology Test In Last 3 Years" then true
    when (not "Is Age 30 to 64 at end of Measurement Period") then false
    when "Is Cervical Cytology Plus HPV Test In Last 5 Years" then true
    else false
  end

define "Is Female":
  Patient.gender = 'female'

define "Is Age 24 to 64 at end of Measurement Period":
  AgeInYearsAt(end of "Measurement Period") between 24 and 64

define "Is Age 30 to 64 at end of Measurement Period":
  AgeInYearsAt(end of "Measurement Period") between 30 and 64

define "Is Cervical Cytology Test In Last 3 Years":
  exists (
    "Dates of Cervical Cytology Tests" WhenCC
      where WhenCC included in day of "Lookback Interval Two More Years"
  )

define "Is Cervical Cytology Plus HPV Test In Last 5 Years":
  exists (
    "Dates of Cervical Cytology Tests" WhenCC
      with "Dates of HPV Tests" WhenHPV
        such that (((difference in days between start of WhenCC and start of WhenHPV) <= 4)
          and AgeInYearsAt(start of WhenCC) >= 30
          and AgeInYearsAt(start of WhenHPV) >= 30
          and WhenCC included in day of "Lookback Interval Four More Years"
          and WhenHPV included in day of "Lookback Interval Four More Years")
  )

define "Dates of Cervical Cytology Tests":
  ([Procedure: "Cervical Cytology Value Set"] Proc
    where Proc.status = 'completed'
    return Proc.performed as FHIR.dateTime)
  union
  ([DiagnosticReport: "Cervical Cytology Value Set"] DiagRep
    where DiagRep.status in { 'preliminary', 'final', 'amended', 'corrected', 'appended' }
    return DiagRep.effective)
  union
  ([Observation: "Cervical Cytology Value Set"] Obs
    where Obs.status in { 'final', 'amended' }
    return Obs.effective)

define "Dates of HPV Tests":
  ([Procedure: "HPV Tests Value Set"] Proc
    where Proc.status = 'completed'
    return Proc.performed as FHIR.dateTime)
  union
  ([DiagnosticReport: "HPV Tests Value Set"] DiagRep
    where DiagRep.status.value in { 'preliminary', 'final', 'amended', 'corrected', 'appended' }
    return DiagRep.effective)
  union
  ([Observation: "HPV Tests Value Set"] Obs
    where Obs.status.value in { 'final', 'amended' }
    return Obs.effective)

define "Denominator Exclusion":
  "Is Hysterectomy"

define "Is Hysterectomy":
  exists (
    [Procedure: "Absence of Cervix Value Set"] Proc
      where Proc.status = 'completed'
        and Proc.performed same day or before end of "Measurement Period"
  )
