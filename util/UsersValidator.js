const Ajv=require("ajv").default;
const ajv=new Ajv();

const schema={
    "type":"object",
    "properties":{
        "name":{
            "type":"string",
            "pattern":"^[A-Z][a-z]*$"
        },
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+"
        },
        "password":{
            "type":"string",
            "minLength":5
        },
        "phoneNumber": {
          "type": "integer",
            "pattern": "^[0-9]{11}$"
          },
    "address": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9\\s,#-]*$"
    },
    "month1": {
      "type": "integer",
      "minimum": 1,
      "maximum": 6
      },
    "month2": {
      "type": "integer",
      "minimum": 1,
      "maximum": 6
      },
      "month3": {
        "type": "integer",
        "minimum": 1,
        "maximum": 6
        },
        "month4": {
          "type": "integer",
          "minimum": 1,
          "maximum": 6
          },
    },
    "required":["name","password","email","phoneNumber","address","month1","month2","month3","month4"]
}



module.exports=ajv.compile(schema)