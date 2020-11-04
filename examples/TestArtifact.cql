library TestArtifact version '1'

using FHIR version '4.0.0'

include "FHIRHelpers" version '4.0.0' called FHIRHelpers

codesystem "SNOMED": 'http://snomed.info/sct'
codesystem "CONDCLINSTATUS": 'http://terminology.hl7.org/CodeSystem/condition-clinical'
codesystem "CONDVERSTATUS": 'http://terminology.hl7.org/CodeSystem/condition-ver-status'

code "Essential hypertension (disorder) code": '59621000' from "SNOMED" display 'Essential hypertension (disorder)'
code "Malignant hypertensive chronic kidney disease (disorder) code": '285831000119108' from "SNOMED" display 'Malignant hypertensive chronic kidney disease (disorder)'
code "Condition Active code": 'active' from "CONDCLINSTATUS" display 'Active'
code "Condition Confirmed code": 'confirmed' from "CONDVERSTATUS" display 'Confirmed'

concept "Condition Active": { "Condition Active code" } display 'Active'
concept "Condition Confirmed": { "Condition Confirmed code" } display 'Confirmed'

context Patient

define "AgeRange-548":
  AgeInYears() >= 60 and AgeInYears() <= 85

define "Essential hypertension (disorder)":
  exists(ActiveCondition([Condition: "Essential hypertension (disorder) code"]))

define "Malignant hypertensive chronic kidney disease (disorder)":
  exists(Confirmed([Condition: "Malignant hypertensive chronic kidney disease (disorder) code"]))

define "MeetsInclusionCriteria":
  "AgeRange-548"
  and "Essential hypertension (disorder)"

define "MeetsExclusionCriteria":
  "Malignant hypertensive chronic kidney disease (disorder)"

define "InPopulation":
  "MeetsInclusionCriteria" and not "MeetsExclusionCriteria"

define "Recommendation":
  if "InPopulation" then ''
  else null


define "Rationale":
  if "InPopulation" then null
  else null

define "Errors":
  null


define function Confirmed(CondList List<Condition>):
  CondList C where C.verificationStatus ~ "Condition Confirmed code"

define function ActiveCondition(CondList List<Condition>):
  CondList C
    where C.clinicalStatus ~ "Condition Active code"
      and C.abatement is null
