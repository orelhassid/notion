if (prop("Date"), prop("Minutes") < 1440 ? abs(prop("Minutes")) < 60 ? format(prop("Minutes")) + "Minutes" : format(prop("Minutes") / 60) + "Hours" : prop("Minutes") < 43200 ? format(prop("Minutes") / 1440) + "Days" : format(prop("Minutes") / 43200) + " Months " + "And " + format(prop("Day")) + "Days" , "Date not selected")


if (prop("Date"), if(prop("Minutes") < 1440,

abs(prop("Minutes")) < 60 ? format(prop("Minutes")) + "Minutes" : format(prop("Minutes") / 60) + "Hours",

prop("Minutes") < 43200 ? format(prop("Minutes") / 1440) + "Days" : format(prop("Minutes") / 43200) + " Months " + "And " + format(prop("Day")) + " Days"), "Date not selected"


if(not empty(prop("Date")), if(prop("Minutes") < 1440, (abs(prop("Minutes")) < 60) ? (format(prop("Minutes")) + "Minutes") : (format(abs(prop("Minutes")) / 60) + "Hours"), (prop("Minutes") < 43200) ? (format(prop("Minutes") / 1440) + "Days") : (format(prop("Minutes") / 43200) + " Months " + "And " + format(prop("Day")) + " Days")), "Date not selected")


prop("תאריך") ? (prop("Prefix") + if(prop("Hours") < 24, (abs(prop("Minutes")) < 60) ? (format(prop("Minutes")) + "Minutes") : (format(prop("Hours")) + "Hours"), (prop("Days") < 30) ? (format(prop("Days")) + "Days") : (format(prop("Months")) + "Months" + "And" + prop("Day") + " Days"))) : "Date is not selected"