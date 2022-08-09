export const examples = [
  {
    cql: "\/*\r\n  This example is provided to illustrate the syntax and properties of CQL types\r\n*\/\r\nlibrary CqlTypes version \'2.0\'\r\n\r\nusing FHIR version \'4.0.1\'\r\n\r\ncontext Patient\r\n\r\n\/\/ Integer\r\ndefine CqlInteger: 5\r\ndefine IntegerUpperBound: 2147483647\r\ndefine IntegerLowerBound: -2147483647\r\n\r\n\/\/ Decimal\r\ndefine CqlDecimal: 5.0\r\ndefine CqlDecimalMaxPrecision: 5.00000001\r\n\r\n\/\/ Quantity - a number with an associated unit\r\ndefine CqlQuantity: 5.0 \'g\'\r\n\r\n\/*\r\n  DateTime\r\n  DateTime values are used to represent an instant along the timeline, known to at\r\n  least the year precision, and potentially to the millisecond precision.\r\n*\/\r\ndefine CqlDateTimeYear: DateTime(2012)\r\ndefine CqlDateTimeMonth: DateTime(2012, 4)\r\ndefine CqlDateTimeDay: DateTime(2012, 4, 4)\r\ndefine CqlDateTimeHour: DateTime(2012, 4, 4, 12)\r\ndefine CqlDateTimeMinute: DateTime(2012, 4, 4, 12, 30)\r\ndefine CqlDateTimeSecond: DateTime(2012, 4, 4, 12, 30, 45)\r\ndefine CqlDateTimeMilli: DateTime(2012, 4, 4, 12, 30, 45, 250)\r\ndefine CqlDateTimeOffset: DateTime(2012, 4, 4, 12, 30, 45, 250, -7.0)\r\ndefine CqlDateTimeLiteralYear: @2012\r\ndefine CqlDateTimeLiteralMonth: @2012-04\r\ndefine CqlDateTimeLiteralDay: @2012-04-04\r\ndefine CqlDateTimeLiteralHour: @2012-04-04T12\r\ndefine CqlDateTimeLiteralMinute: @2012-04-04T12:30\r\ndefine CqlDateTimeLiteralSecond: @2012-04-04T12:30:45\r\ndefine CqlDateTimeLiteralMilli: @2012-04-04T12:30:45.250\r\ndefine CqlDateTimeLiteralOffset: @2012-04-04T12:30:45.250Z\r\n\r\n\/*\r\n  Time\r\n  Time values are used to represent a time of day, independent of the date.\r\n  Time value must be known to at least the hour precision, and potentially\r\n  to the millisecond precision\r\n*\/\r\ndefine CqlTimeHour: Time(12)\r\ndefine CqlTimeMinute: Time(12, 30)\r\ndefine CqlTimeSecond: Time(12, 30, 15)\r\ndefine CqlTimeMilli: Time(12, 30, 15, 100)\r\ndefine CqlTimeLiteralHour: @T12\r\ndefine CqlTimeLiteralMinute: @T12:30\r\ndefine CqlTimeLiteralSecond: @T12:30:15\r\ndefine CqlTimeLiteralMilli: @T12:30:15.100\r\n\r\n\/*\r\n  List\r\n  CQL supports the representation of lists of any type of value (including other lists),\r\n  but all the elements within a given list must be of the same type.\r\n*\/\r\ndefine CqlList: { 1, 2, 3 }\r\ndefine CqlListOfList: { { 1 }, { 1, 2, 3}, { 4 }, { 5 } }\r\n"
  },
  {
    cql: "library Welcome version \'1.0.0\'\r\n\r\n\/\/ Welcome to the CQL Runner!\r\n\/\/ Project Github: https:\/\/github.com\/DBCG\/cql_runner\r\n\/\/ Navigate to the config tab above to configure the evaluation options\r\n\/\/ Happy coding!\r\n\r\ndefine \"Simple Multiply\": 5*5\r\n\r\ndefine \"Simple Message\": \'Hello World!\'"
  }
];
