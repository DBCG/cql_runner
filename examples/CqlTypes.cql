/*
  This example is provided to illustrate the syntax and properties of CQL types
*/
library CqlTypes version '2.0'

using FHIR version '4.0.1'

context Patient

// Integer
define CqlInteger: 5
define IntegerUpperBound: 2147483647
define IntegerLowerBound: -2147483647

// Decimal
define CqlDecimal: 5.0
define CqlDecimalMaxPrecision: 5.00000001

// Quantity - a number with an associated unit
define CqlQuantity: 5.0 'g'

/*
  DateTime
  DateTime values are used to represent an instant along the timeline, known to at
  least the year precision, and potentially to the millisecond precision.
*/
define CqlDateTimeYear: DateTime(2012)
define CqlDateTimeMonth: DateTime(2012, 4)
define CqlDateTimeDay: DateTime(2012, 4, 4)
define CqlDateTimeHour: DateTime(2012, 4, 4, 12)
define CqlDateTimeMinute: DateTime(2012, 4, 4, 12, 30)
define CqlDateTimeSecond: DateTime(2012, 4, 4, 12, 30, 45)
define CqlDateTimeMilli: DateTime(2012, 4, 4, 12, 30, 45, 250)
define CqlDateTimeOffset: DateTime(2012, 4, 4, 12, 30, 45, 250, -7.0)
define CqlDateTimeLiteralYear: @2012
define CqlDateTimeLiteralMonth: @2012-04
define CqlDateTimeLiteralDay: @2012-04-04
define CqlDateTimeLiteralHour: @2012-04-04T12
define CqlDateTimeLiteralMinute: @2012-04-04T12:30
define CqlDateTimeLiteralSecond: @2012-04-04T12:30:45
define CqlDateTimeLiteralMilli: @2012-04-04T12:30:45.250
define CqlDateTimeLiteralOffset: @2012-04-04T12:30:45.250Z

/*
  Time
  Time values are used to represent a time of day, independent of the date.
  Time value must be known to at least the hour precision, and potentially
  to the millisecond precision
*/
define CqlTimeHour: Time(12)
define CqlTimeMinute: Time(12, 30)
define CqlTimeSecond: Time(12, 30, 15)
define CqlTimeMilli: Time(12, 30, 15, 100)
define CqlTimeLiteralHour: @T12
define CqlTimeLiteralMinute: @T12:30
define CqlTimeLiteralSecond: @T12:30:15
define CqlTimeLiteralMilli: @T12:30:15.100

/*
  List
  CQL supports the representation of lists of any type of value (including other lists),
  but all the elements within a given list must be of the same type.
*/
define CqlList: { 1, 2, 3 }
define CqlListOfList: { { 1 }, { 1, 2, 3}, { 4 }, { 5 } }
