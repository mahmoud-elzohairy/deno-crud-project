import Response from "../app/Handler/response.ts";

export default {
  async validate(ctx: any, rules: any) {
    let errorsList = [];

    if (!ctx.request.hasBody) {
      for (let key of Object.keys(rules)) {
        let paramErrorMsgs = [];
        paramErrorMsgs.push(`${key} is required`);
        if (paramErrorMsgs.length > 0) {
          errorsList.push({
            [key]: paramErrorMsgs,
          });
        }
      }
      Response.errorResponse(
        ctx,
        errorsList,
        "Please, Fill all required data !!",
      );
      return false;
    }

    const { value } = await ctx.request.body();

    for (let key of Object.keys(rules)) {
      let splitedData = rules[key].split("|");
      let paramErrorMsgs = [];

      if (
        !(key in value) || splitedData.includes("required") && !value[key]
      ) {
        paramErrorMsgs.push(`${key} is required`);
      }

      if (key in value) {
        if (splitedData.includes("email") && !checkEmail(value[key])) {
          paramErrorMsgs.push(`${key} is not e-mail address`);
        }

        // console.log(value[key], isNumber(value[key]))

        if (splitedData.includes("numeric") && !isNumber(value[key])) {
          paramErrorMsgs.push(`${key} is not a number`);
        }

        // Check min && max
        for (let split of splitedData) {
          let checkMinAndMax = checkMinMax(split, value[key], key);
          if (checkMinAndMax.status == true && value[key]) {
            paramErrorMsgs.push(checkMinAndMax.message);
          }
        }
      }

      if (paramErrorMsgs.length > 0) {
        errorsList.push({
          [key]: paramErrorMsgs,
        });
      }
    }

    if (errorsList.length > 0) {
      ctx.response.status = 404;
      ctx.response.body = errorsList;
      return false;
    }
    return value;
  },
};

const checkEmail = function (email: any) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isNumber = function (num: any) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(num);
};

const checkMinMax = function (validation: any, value: any, name: any) {
  let min = validation.match(/min:/g) != null
    ? Number(validation.split(":")[1])
    : 0;
  let max = validation.match(/max:/g) != null
    ? Number(validation.split(":")[1])
    : 0;
  let val: number = value.toString().length;

  if (min > 0 && max > 0 && val > min && val > max) {
    return {
      status: true,
      message: `The ${name} must be between ${min} and ${max}`,
    };
  }

  if (min > 0 && val < min && max == 0) {
    return {
      status: true,
      message: `The ${name} must be at leat ${min}`,
    };
  }

  if (max > 0 && val > max && min == 0) {
    return {
      status: true,
      message: `The ${name} may not be greater than ${max}`,
    };
  }

  return {
    status: false,
  };
};
