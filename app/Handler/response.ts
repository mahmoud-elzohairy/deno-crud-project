export default {
  successResponse(ctx: any, data: any = null, msg: string = "") {
    ctx.response.body = {
      status: true,
      data: data,
      message: msg,
    };
  },

  errorResponse(ctx: any, errors: any = null, msg: string = "") {
    ctx.response.body = {
      status: false,
      errors: errors,
      message: msg,
    };
  },
};
